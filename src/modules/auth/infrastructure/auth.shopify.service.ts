import { StorefrontClient } from "#infrastructure/shopify/storefront.js";
import { AuthService } from "../application/ports/auth.service.js";
import { 
    CustomerAccessTokenCreateInput, 
    CustomerCreateInput,
    CustomerRecoverInput,
    CustomerResetInput,
    CustomerActivateInput,
} from "../application/dto/auth.dto.js";
import * as mutations from "./graphql/auth.mutations.js";
import { handleUserErrors } from "#shared/utils/user-errors.js";

export class ShopifyAuthService implements AuthService {
    constructor(
        private readonly storefrontClient: StorefrontClient
    ) {}

    async customerAccessTokenCreate(input: CustomerAccessTokenCreateInput, buyerIp?: string): Promise<any> {
        const { email, password } = input;
        const { customerAccessTokenCreate } = await this.storefrontClient.request(mutations.customerAccessTokenCreate, {
            variables: {
                input: {
                    email,
                    password
                }
            },
            buyerIp
        }) as any;
        handleUserErrors(customerAccessTokenCreate.customerUserErrors);
        return customerAccessTokenCreate;
    }

    async customerCreate(input: CustomerCreateInput, buyerIp?: string): Promise<any> {
        const { email, password } = input;
        const { customerCreate } = await this.storefrontClient.request(mutations.customerCreate, {
            variables: {
                input: {
                    email,
                    password
                }
            },
            buyerIp
        }) as any;
        handleUserErrors(customerCreate.customerUserErrors);
        return customerCreate;
    }

    async customerRecover(input: CustomerRecoverInput, buyerIp?: string): Promise<any> {
        const { email } = input;
        const { customerRecover } = await this.storefrontClient.request(mutations.customerRecover, {
            variables: { email },
            buyerIp
        }) as any;
        handleUserErrors(customerRecover.customerUserErrors);
        return customerRecover;
    }

    async customerReset(input: CustomerResetInput, buyerIp?: string): Promise<any> {
        const { id, password, resetToken } = input;
        const { customerReset } = await this.storefrontClient.request(mutations.customerReset, {
            variables: {
                id,
                input: {
                    password,
                    resetToken
                }
            },
            buyerIp
        }) as any;
        console.log('customerReset response:', customerReset);
        handleUserErrors(customerReset.customerUserErrors);
        return customerReset;
    }

    async customerActivate(input: CustomerActivateInput, buyerIp?: string): Promise<any> {
        const { id, password, activationToken } = input;
        const { customerActivate } = await this.storefrontClient.request(mutations.customerActivate, {
            variables: {
                id,
                input: {
                    password,
                    activationToken
                }
            },
            buyerIp
        }) as any;
        handleUserErrors(customerActivate.customerUserErrors);
        return customerActivate;
    }
}