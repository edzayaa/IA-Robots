import { ProductsShopifyClient } from '../../infrastructure/products.shopify.client.js';

export class GetProductsUseCase {
    constructor(
        private productsShopifyClient: ProductsShopifyClient
    ) {}

    async execute(): Promise<any> {
        return this.productsShopifyClient.getProducts();
    }
}