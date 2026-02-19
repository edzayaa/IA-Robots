import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import type { ShopifyConfig } from '#config/shopify.js';
import { ShopifyErrorMapper } from '#infrastructure/shopify/mappers/shopify-error.js';

export interface ShopifyRequestOptions {
    variables?: Record<string, unknown>;
    headers?: Record<string, string>;
    buyerIp?: string;
    apiVersion?: string;
    retries?: number;
}

interface StorefrontResponse<TData> {
    data?: TData;
    errors?: unknown;
}

export class StorefrontClient {
    private readonly client;

    constructor(shopifyConfig: ShopifyConfig) {
        this.client = createStorefrontApiClient({
            storeDomain: shopifyConfig.storeDomain,
            privateAccessToken: shopifyConfig.storefrontAccessToken,
            apiVersion: shopifyConfig.apiVersion,
            retries: Math.min(shopifyConfig.maxRetries, 3)
        });
    }

    async request<TData>(operation: string, options: ShopifyRequestOptions = {}): Promise<TData> {
        try {
            const response = (await this.client.request(operation, {
                variables: options.variables,
                headers: {
                    ...options.headers,
                    ...(options.buyerIp ? { 'Shopify-Storefront-Buyer-IP': options.buyerIp } : {})
                },
                apiVersion: options.apiVersion,
                retries: options.retries
            })) as StorefrontResponse<TData>;

            console.debug('Storefront API response:', response.errors);

            if (response.errors && (response.errors as any).graphQLErrors && (response.errors as any).graphQLErrors.length > 0) {
                throw ShopifyErrorMapper.fromGraphqlErrors((response.errors as any).graphQLErrors);
            }

            if (!response.data) {
                throw ShopifyErrorMapper.fromUnknown(new Error('Storefront API response missing data'));
            }
            
            return response.data;
        } catch (error) {
            console.error('Storefront API request failed:', error);
            throw ShopifyErrorMapper.fromUnknown(error);
        }
    }

    async requestStream<TData>(operation: string, options: ShopifyRequestOptions = {}): Promise<TData> {
        return this.request<TData>(operation, options);
    }
}
