import { AuthService } from '../ports/auth.service.js';
import { CustomerActivateInput } from '../dto/auth.dto.js';

export class ActivateAccountUseCase {
    constructor(
        private readonly authService: AuthService
    ) {}

    async execute(input: CustomerActivateInput, buyerIp?: string): Promise<any> {
        return this.authService.customerActivate(input, buyerIp);
    }
}
