import { AuthService } from '../ports/auth.service.js';
import { CustomerAccessTokenCreateInput } from '../dto/auth.dto.js';

export class LoginUseCase {
    constructor(
        private readonly authService: AuthService
    ) {}

    async execute(input: CustomerAccessTokenCreateInput, buyerIp?: string): Promise<any> {
        return this.authService.customerAccessTokenCreate(input, buyerIp);
    }
}