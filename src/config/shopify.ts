import { env } from './env.js';

export const shopifyConfig = {
    storeDomain: env.SHOPIFY_STORE_DOMAIN,
    storefrontAccessToken: env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    adminAccessToken: env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    apiVersion: env.SHOPIFY_API_VERSION,
    requestTimeoutMs: env.SHOPIFY_REQUEST_TIMEOUT_MS,
    maxRetries: env.SHOPIFY_MAX_RETRIES
} as const;

export type ShopifyConfig = typeof shopifyConfig;
