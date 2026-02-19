import { ProductsShopifyClient } from "#modules/products/infrastructure/products.shopify.client.js";

export class PredictiveSearchUseCase {
    constructor(
        private readonly productsShopifyClient: ProductsShopifyClient
    ) {}

    async execute(query: string): Promise<any> {
        return this.productsShopifyClient.predictiveSearch(query);
    }
}