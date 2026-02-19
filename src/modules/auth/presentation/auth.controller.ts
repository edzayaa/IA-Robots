import type { FastifyReply, FastifyRequest } from "fastify";
import { LoginUseCase } from '../application/use-cases/login.usecase.js';
import { RegisterUseCase } from '../application/use-cases/register.usecase.js';
import { ForgotPasswordUseCase } from '../application/use-cases/forgot-password.usecase.js';
import { ResetPasswordUseCase } from '../application/use-cases/reset-password.usecase.js';
import { ActivateAccountUseCase } from '../application/use-cases/activate-account.usecase.js';
import { ok } from "#shared/http/response-mapper.js";
import {
    CustomerAccessTokenCreateInput,
    CustomerCreateInput,
    CustomerRecoverInput,
    CustomerResetInput,
    CustomerActivateInput
} from '../application/dto/auth.dto.js';

export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase,
        private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
        private readonly activateAccountUseCase: ActivateAccountUseCase
    ) {}

    private getBuyerIp(request: FastifyRequest): string | undefined {
        const forwardedFor = request.headers['x-forwarded-for'];
        const realIp = request.headers['x-real-ip'];

        if (typeof forwardedFor === 'string') {
            const firstIp = forwardedFor.split(',')[0]?.trim();
            if (firstIp) return firstIp;
        }

        if (typeof realIp === 'string' && realIp.trim().length > 0) {
            return realIp.trim();
        }

        return request.ip;
    }

    async login(request: FastifyRequest, reply: FastifyReply): Promise<any> {
        const data = request.body as CustomerAccessTokenCreateInput;
        const buyerIp = this.getBuyerIp(request);
        const result = await this.loginUseCase.execute(data, buyerIp);
        reply.send(ok(result));
    }

    async register(request: FastifyRequest, reply: FastifyReply): Promise<any> {
        const data = request.body as CustomerCreateInput;
        const buyerIp = this.getBuyerIp(request);
        const result = await this.registerUseCase.execute(data, buyerIp);
        reply.send(ok(result));
    }

    async forgotPassword(request: FastifyRequest, reply: FastifyReply): Promise<any> {
        const data = request.body as CustomerRecoverInput;
        const buyerIp = this.getBuyerIp(request);
        const result = await this.forgotPasswordUseCase.execute(data, buyerIp);
        reply.send(ok(result));
    }

    async resetPassword(request: FastifyRequest, reply: FastifyReply): Promise<any> {
        const data = request.body as CustomerResetInput;
        const buyerIp = this.getBuyerIp(request);
        const result = await this.resetPasswordUseCase.execute(data, buyerIp);
        reply.send(ok(result));
    }

    async activateAccount(request: FastifyRequest, reply: FastifyReply): Promise<any> {
        const data = request.body as CustomerActivateInput;
        const buyerIp = this.getBuyerIp(request);
        const result = await this.activateAccountUseCase.execute(data, buyerIp);
        reply.send(ok(result));
    }
}