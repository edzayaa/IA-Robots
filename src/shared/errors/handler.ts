import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';1
import { AppError } from './app.js';
import { ErrorCode } from './codes.js';

type FastifyValidationError = {
    code?: string;
    statusCode?: number;
    message?: string;
    validation?: unknown;
    validationContext?: 'body' | 'params' | 'querystring' | 'headers';
};

const isFastifyValidationError = (error: unknown): error is FastifyValidationError => {
    if (!error || typeof error !== 'object') return false;

    const candidate = error as FastifyValidationError;
    return (
        candidate.code === 'FST_ERR_VALIDATION' ||
        (candidate.statusCode === 400 && Array.isArray(candidate.validation))
    );
};

export const setGlobalErrorHandler = (app: FastifyInstance): void => {
    app.setErrorHandler((error: unknown, request: FastifyRequest, reply: FastifyReply) => {
        if (error instanceof AppError) {
            request.log.error({ err: error }, 'Application error');
            reply.status(error.statusCode).send({
                statusCode: error.statusCode,
                error: error.code,
                message: error.message,
                details: error.details
            });
            return;
        }


        if (isFastifyValidationError(error)) {
            reply.status(400).send({
                statusCode: 400,
                error: ErrorCode.VALIDATION_ERROR,
                message: error.message ?? 'Validation failed',
                details: {
                    context: error.validationContext,
                    issues: error.validation
                }
            });
            return;
        }

        request.log.error({ err: error }, 'Unhandled error');
        reply.status(500).send({
            statusCode: 500,
            error: ErrorCode.INTERNAL_ERROR,
            message: 'Internal Server Error'
        });
    });
};
