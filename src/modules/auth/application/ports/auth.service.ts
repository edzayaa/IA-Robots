import { 
    CustomerAccessTokenCreateInput, 
    CustomerCreateInput,
    CustomerRecoverInput,
    CustomerResetInput,
    CustomerActivateInput,
} from "../dto/auth.dto.js";

export interface AuthService {
    customerAccessTokenCreate(input: CustomerAccessTokenCreateInput, buyerIp?: string): Promise<any>;
    customerCreate(input: CustomerCreateInput, buyerIp?: string): Promise<any>;
    customerRecover(input: CustomerRecoverInput, buyerIp?: string): Promise<any>;
    customerReset(input: CustomerResetInput, buyerIp?: string): Promise<any>;
    customerActivate(input: CustomerActivateInput, buyerIp?: string): Promise<any>;
}