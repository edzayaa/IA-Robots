import { AuthService } from '../ports/auth.service.js';
import { CustomerRecoverInput } from '../dto/auth.dto.js';

export class ForgotPasswordUseCase {
    constructor(
        private readonly authService: AuthService
    ) {}

    async execute(input: CustomerRecoverInput, buyerIp?: string): Promise<any> {
        return this.authService.customerRecover(input, buyerIp);
    }
}
