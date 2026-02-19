import { CustomerCreateInput } from "#modules/auth/application/dto/auth.dto.js";
import { ensurePasswordStrength } from "#shared/validation/common.js";
import { AppError } from "#shared/errors/app.js";
import { ErrorCode } from "#shared/errors/codes.js";

export const ensurePasswordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
};

export const ensureUserCanRegister = (data: CustomerCreateInput): boolean => {
    const { password, confirmPassword, acceptTerms } = data;
    
    if (!ensurePasswordsMatch(password, confirmPassword)) {
        throw new AppError('Passwords do not match', ErrorCode.VALIDATION_ERROR, 400);
    }

    if (!ensurePasswordStrength(password)) {
        throw new AppError('Password must be at least 8 characters long and include uppercase letters, lowercase letters, and numbers', ErrorCode.VALIDATION_ERROR, 400);
    }

    if (!acceptTerms) {
        throw new AppError('You must accept the terms and conditions to register', ErrorCode.VALIDATION_ERROR, 400);
    }

    return true;
}