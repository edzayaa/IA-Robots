import { AuthService } from '../ports/auth.service.js';
import { ensureUserCanRegister } from '#modules/auth/domain/rules/register.rules.js';
import { CustomerCreateInput } from '../dto/auth.dto.js';

export class RegisterUseCase {
    constructor(
        private readonly authService: AuthService
    ) {}

    async execute(input: CustomerCreateInput, buyerIp?: string): Promise<any> {
        ensureUserCanRegister(input);
        return this.authService.customerCreate(input, buyerIp);
    }
}