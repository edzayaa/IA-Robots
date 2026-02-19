import { AppError } from '#shared/errors/app.js';
import { ErrorCode } from '#shared/errors/codes.js';

type ShopifyUserError = {
    code?: string;
    message?: string;
};

export function handleUserErrors(errors: ShopifyUserError[] = []): void {
    if (errors.length === 0) return;

    const firstError = errors[0];
    if (!firstError) return;

    /*
    if (firstError.code === 'UNIDENTIFIED_CUSTOMER') {
        if (firstError.message?.toLocaleLowerCase() === 'could not find customer') {
            throw new AppError(
                'No account found with the provided email. Please check your email and try again.',
                ErrorCode.UNAUTHORIZED,
                401
            );
        }

        throw new AppError(
            'The provided credentials are incorrect. Please try again.',
            ErrorCode.UNAUTHORIZED,
            401
        );
    }
    */

    throw new AppError(
        firstError.message ?? 'Authentication failed',
        ErrorCode.VALIDATION_ERROR,
        400,
        errors
    );
}