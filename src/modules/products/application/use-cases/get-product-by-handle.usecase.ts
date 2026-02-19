import { ProductsShopifyClient } from "#modules/products/infrastructure/products.shopify.client.js";

export class GetProductByHandleUseCase {
    constructor(
        private productsShopifyClient: ProductsShopifyClient
    ) {}

    async execute(handle: string): Promise<any> {
        return this.productsShopifyClient.getProductByHandle(handle);
    }
}