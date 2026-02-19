import type { z } from 'zod';
import { AppError } from '../errors/app.js';
import { ErrorCode } from '../errors/codes.js';

export const parseOrThrow = <TSchema extends z.ZodTypeAny>(
    schema: TSchema,
    value: unknown
): z.infer<TSchema> => {
    const result = schema.safeParse(value);
    if (!result.success) {
        throw new AppError('Validation failed', ErrorCode.VALIDATION_ERROR, 400, result.error.flatten());
    }

    return result.data;
};
