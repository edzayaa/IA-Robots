import type { FastifyInstance, FastifyRequest } from 'fastify';

export const rateLimitConfigs = {
    auth: { max: 5, timeWindow: '1 minute' },
    products: { max: 100, timeWindow: '1 minute' },
    productDetail: { max: 200, timeWindow: '1 minute' },
    search: { max: 20, timeWindow: '1 minute' },
    admin: { max: 10, timeWindow: '1 minute' },
    upload: { max: 3, timeWindow: '5 minutes' }
};

export type RateLimitType = keyof typeof rateLimitConfigs;

export const applyRateLimit = async (
    app: FastifyInstance,
    type: RateLimitType,
    keyGenerator?: (request: FastifyRequest) => string
) => {
    const config = rateLimitConfigs[type];

    await app.register(import('@fastify/rate-limit'), {
        max: config.max,
        timeWindow: config.timeWindow,
        redis: app.redis,
        keyGenerator: keyGenerator || ((request: FastifyRequest) => {
            return `rate_limit:${type}:${request.ip}`;
        }),
        errorResponseBuilder: () => ({
            error: 'Too many requests',
            type,
            retryAfter: config.timeWindow
        })
    });
};

export const skipRateLimit = (request: FastifyRequest) => {
    return request.routeOptions.url === '/health';
};
