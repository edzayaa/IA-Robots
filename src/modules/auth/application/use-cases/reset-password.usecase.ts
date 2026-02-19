import { AuthService } from '../ports/auth.service.js';
import { CustomerResetInput } from '../dto/auth.dto.js';

export class ResetPasswordUseCase {
    constructor(
        private readonly authService: AuthService
    ) {}

    async execute(input: CustomerResetInput, buyerIp?: string): Promise<any> {
        return this.authService.customerReset(input, buyerIp);
    }
}
