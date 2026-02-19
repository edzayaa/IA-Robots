import rateLimit from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';
import { appConfig } from '#config/app.js';

export const registerRateLimit = async (app: FastifyInstance): Promise<void> => {
    await app.register(rateLimit, {
        max: appConfig.rateLimitMax,
        timeWindow: appConfig.rateLimitTimeWindow,
        redis: app.redis
    });
};
