import { asClass, type AwilixContainer } from 'awilix';
import { ShopifyAuthService } from '#modules/auth/infrastructure/auth.shopify.service.js';

export const registerAuthModule = (container: AwilixContainer) => {
    container.register({
        authService: asClass(ShopifyAuthService).singleton(),
    });
};
