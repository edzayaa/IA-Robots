import { asClass, type AwilixContainer } from 'awilix';
import { GetProductsUseCase } from '#modules/products/application/use-cases/get-products.usecase.js';
import { GetProductByHandleUseCase } from '#modules/products/application/use-cases/get-product-by-handle.usecase.js';
import { PredictiveSearchUseCase } from '#modules/products/application/use-cases/predictive-search.usecase.js';
import { SubmitContactUseCase } from '#modules/forms/application/use-cases/submit-contact.usecase.js';
import { SubmitRequestDemoUseCase } from '#modules/forms/application/use-cases/submit-request-demo.usecase.js';
import { LoginUseCase } from '#modules/auth/application/use-cases/login.usecase.js';
import { RegisterUseCase } from '#modules/auth/application/use-cases/register.usecase.js';
import { ForgotPasswordUseCase } from '#modules/auth/application/use-cases/forgot-password.usecase.js';
import { ResetPasswordUseCase } from '#modules/auth/application/use-cases/reset-password.usecase.js';
import { ActivateAccountUseCase } from '#modules/auth/application/use-cases/activate-account.usecase.js';

export const registerApplication = (container: AwilixContainer) => {
    container.register({
        getProductsUseCase: asClass(GetProductsUseCase),
        getProductByHandleUseCase: asClass(GetProductByHandleUseCase),
        predictiveSearchUseCase: asClass(PredictiveSearchUseCase),

        submitContactUseCase: asClass(SubmitContactUseCase),
        submitRequestDemoUseCase: asClass(SubmitRequestDemoUseCase),

        loginUseCase: asClass(LoginUseCase),
        registerUseCase: asClass(RegisterUseCase),
        forgotPasswordUseCase: asClass(ForgotPasswordUseCase),
        resetPasswordUseCase: asClass(ResetPasswordUseCase),
        activateAccountUseCase: asClass(ActivateAccountUseCase),
    });
};
