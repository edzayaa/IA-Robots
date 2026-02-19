import { env } from './env.js';

export const appConfig = {
    env: env.NODE_ENV,
    port: env.PORT,
    corsOrigin: env.CORS_ORIGIN,
    rateLimitMax: env.RATE_LIMIT_MAX,
    rateLimitTimeWindow: env.RATE_LIMIT_TIME_WINDOW,
    redisUrl: env.REDIS_URL,
    redisKeyPrefix: env.REDIS_KEY_PREFIX,
    cacheTtlSeconds: env.CACHE_TTL_SECONDS
} as const;

export type AppConfig = typeof appConfig;
