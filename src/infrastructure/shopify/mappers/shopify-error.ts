import { AppError } from '#shared/errors/app.js';
import { ErrorCode } from '#shared/errors/codes.js';

interface GraphQLErrorLike {
    message?: string;
    extensions?: {
        code?: string;
    };
}

export class ShopifyErrorMapper {
    static fromGraphqlErrors(errors: unknown): AppError {
        const list = Array.isArray(errors) ? (errors as GraphQLErrorLike[]) : [];
        const first = list[0];
        const message = first?.message ?? 'Shopify GraphQL error';

        return new AppError(message, ErrorCode.SHOPIFY_UPSTREAM_ERROR, 502, {
            source: 'shopify',
            errors: list
        });
    }

    static fromUnknown(error: unknown): AppError {
        if (error instanceof AppError) {
            return error;
        }

        return new AppError('Shopify request failed', ErrorCode.SHOPIFY_UPSTREAM_ERROR, 502, {
            source: 'shopify',
            cause: error
        });
    }
}
