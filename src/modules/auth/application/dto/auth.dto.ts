export interface CustomerAccessTokenCreateInput {
    email: string;
    password: string;
}

export interface CustomerCreateInput {
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

export interface CustomerRecoverInput {
    email: string;
}

export interface CustomerResetInput {
    id: string;
    resetToken: string;
    password: string;
}

export interface CustomerActivateInput {
    id: string;
    activationToken: string;
    password: string;
}