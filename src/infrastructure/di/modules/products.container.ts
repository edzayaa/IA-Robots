import { asClass, type AwilixContainer } from 'awilix';
import { ProductsShopifyClient } from '#modules/products/infrastructure/products.shopify.client.js';

export const registerProductsModule = (container: AwilixContainer) => {
    container.register({
        productsShopifyClient: asClass(ProductsShopifyClient).singleton(),
    });
};
