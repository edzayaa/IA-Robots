import type { StorefrontClient } from '#infrastructure/shopify/storefront.js';
import type { CacheService } from '#shared/cache/cache.service.js';
import type { SmtpMailerHelper } from '#shared/email/smtp-mailer.helper.js';

import type { ProductsShopifyClient } from '#modules/products/infrastructure/products.shopify.client.js';
import type { MailerService } from '#modules/forms/infrastructure/mailer.service.js';
import type { LoginUseCase } from '#modules/auth/application/use-cases/login.usecase.js';
import type { RegisterUseCase } from '#modules/auth/application/use-cases/register.usecase.js';
import type { ForgotPasswordUseCase } from '#modules/auth/application/use-cases/forgot-password.usecase.js';
import type { ResetPasswordUseCase } from '#modules/auth/application/use-cases/reset-password.usecase.js';
import type { ActivateAccountUseCase } from '#modules/auth/application/use-cases/activate-account.usecase.js';
import type { GetProductsUseCase } from '#modules/products/application/use-cases/get-products.usecase.js';
import type { GetProductByHandleUseCase } from '#modules/products/application/use-cases/get-product-by-handle.usecase.js';
import type { PredictiveSearchUseCase } from '#modules/products/application/use-cases/predictive-search.usecase.js';
import type { SubmitContactUseCase } from '#modules/forms/application/use-cases/submit-contact.usecase.js';
import type { SubmitRequestDemoUseCase } from '#modules/forms/application/use-cases/submit-request-demo.usecase.js';
import type { ShopifyAuthService } from '#modules/auth/infrastructure/auth.shopify.service.js';

declare module '@fastify/awilix' {
    interface Cradle {
        storefrontClient: StorefrontClient;
        cacheService: CacheService;
        smtpMailerHelper: SmtpMailerHelper;

        productsShopifyClient: ProductsShopifyClient;
        mailerService: MailerService;
        authService: ShopifyAuthService;

        // Products
        getProductsUseCase: GetProductsUseCase;
        getProductByHandleUseCase: GetProductByHandleUseCase;
        predictiveSearchUseCase: PredictiveSearchUseCase;

        // Forms
        submitContactUseCase: SubmitContactUseCase;
        submitRequestDemoUseCase: SubmitRequestDemoUseCase;

        // Auth
        loginUseCase: LoginUseCase;
        registerUseCase: RegisterUseCase;
        forgotPasswordUseCase: ForgotPasswordUseCase;
        resetPasswordUseCase: ResetPasswordUseCase;
        activateAccountUseCase: ActivateAccountUseCase;
    }
}

export {};
