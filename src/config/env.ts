import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

const envBoolean = (defaultValue: boolean) => z
    .enum(['true', 'false'])
    .default(defaultValue ? 'true' : 'false')
    .transform((value) => value === 'true');

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

    SHOPIFY_STORE_DOMAIN: z.string().min(1),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1),
    SHOPIFY_ADMIN_ACCESS_TOKEN: z.string().optional(),
    SHOPIFY_API_VERSION: z.string().default('2025-07'),
    SHOPIFY_REQUEST_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
    SHOPIFY_MAX_RETRIES: z.coerce.number().int().min(0).max(3).default(3),

    CORS_ORIGIN: z.string().default('*'),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
    RATE_LIMIT_TIME_WINDOW: z.string().default('1 minute'),

    REDIS_URL: z.string().default('redis://localhost:6379'),
    REDIS_KEY_PREFIX: z.string().default('ia-robots:'),
    CACHE_TTL_SECONDS: z.coerce.number().int().positive().default(300),

    SMTP_HOST: z.string().min(1).default('localhost'),
    SMTP_PORT: z.coerce.number().int().positive().default(587),
    SMTP_SECURE: envBoolean(false),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.string().email().default('no-reply@localhost.localdomain'),
    CONTACT_EMAIL_TO: z.string().min(1).default('no-reply@localhost.localdomain'),
    MAIL_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(20),
    MAIL_RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().int().positive().default(60)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    throw new Error(`Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`);
}

export const env = parsed.data;
