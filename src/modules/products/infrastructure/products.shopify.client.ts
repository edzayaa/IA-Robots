import { StorefrontClient } from '#infrastructure/shopify/storefront.js';
import * as queries from './graphql/products.queries.js';

export class ProductsShopifyClient {
    constructor(
        private storefrontClient: StorefrontClient
    ) {}

    async getProducts(): Promise<any> {
        return this.storefrontClient.request(queries.GET_PRODUCTS, {
            variables: {
                first: 10
            }
        });
    }

    async getProductByHandle(handle: string): Promise<any> {
        return this.storefrontClient.request(queries.GET_PRODUCT_BY_HANDLE, {
            variables: {
                handle
            }
        });
    }

    async predictiveSearch(query: string): Promise<any> {
        return this.storefrontClient.request(queries.PREDICTIVE_SEARCH, {
            variables: {
                query
            }
        });
    }
}