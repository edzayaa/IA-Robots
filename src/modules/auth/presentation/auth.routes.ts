import type { FastifyPluginAsync } from "fastify";
import { AuthController } from "./auth.controller.js";
import {
    customerAccessTokenCreateSchema,
    customerCreateSchema,
    customerRecoverSchema,
    customerResetSchema,
    customerActivateSchema
} from "./auth.schema.js";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
    const {
        loginUseCase,
        registerUseCase,
        forgotPasswordUseCase,
        resetPasswordUseCase,
        activateAccountUseCase
    } = fastify.diContainer.cradle;
    const authController = new AuthController(
        loginUseCase,
        registerUseCase,
        forgotPasswordUseCase,
        resetPasswordUseCase,
        activateAccountUseCase
    );

    fastify.post('/login', { schema: { body: customerAccessTokenCreateSchema } }, async (request, reply) => {
        await authController.login(request, reply);
    });

    fastify.post('/register', { schema: { body: customerCreateSchema } }, async (request, reply) => {
        await authController.register(request, reply);
    });

    fastify.post('/forgot-password', { schema: { body: customerRecoverSchema } }, async (request, reply) => {
        await authController.forgotPassword(request, reply);
    });

    fastify.post('/reset-password', { schema: { body: customerResetSchema } }, async (request, reply) => {
        await authController.resetPassword(request, reply);
    });

    fastify.post('/activate-account', { schema: { body: customerActivateSchema } }, async (request, reply) => {
        await authController.activateAccount(request, reply);
    });
}