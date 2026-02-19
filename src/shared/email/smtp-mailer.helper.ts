import nodemailer, { type SendMailOptions, type SentMessageInfo, type Transporter } from 'nodemailer';
import type { Redis } from 'ioredis';
import { appConfig } from '#config/app.js';
import { emailConfig } from '#config/email.js';
import { AppError } from '#shared/errors/app.js';
import { ErrorCode } from '#shared/errors/codes.js';

export interface SendEmailOptions {
    rateLimitKey?: string;
    skipRateLimit?: boolean;
}

export class SmtpMailerHelper {
    private readonly transporter: Transporter;

    constructor(private readonly redis: Redis | null) {
        this.transporter = nodemailer.createTransport({
            host: emailConfig.smtpHost,
            port: emailConfig.smtpPort,
            secure: emailConfig.smtpSecure,
            auth: emailConfig.smtpUser && emailConfig.smtpPass
                ? {
                    user: emailConfig.smtpUser,
                    pass: emailConfig.smtpPass
                }
                : undefined
        });
    }

    private getRateLimitRedisKey(key: string): string {
        return `${appConfig.redisKeyPrefix}mail:rate_limit:${key}`;
    }

    private buildDefaultRateLimitKey(mailOptions: SendMailOptions): string {
        const recipient = Array.isArray(mailOptions.to)
            ? mailOptions.to.join(',')
            : (mailOptions.to ?? 'unknown-recipient').toString();

        return recipient.toLowerCase();
    }

    private async enforceRateLimit(key: string): Promise<void> {
        if (!this.redis) return;

        const redisKey = this.getRateLimitRedisKey(key);
        const currentCount = await this.redis.incr(redisKey);

        if (currentCount === 1) {
            await this.redis.expire(redisKey, emailConfig.mailRateLimitWindowSeconds);
        }

        if (currentCount <= emailConfig.mailRateLimitMax) {
            return;
        }

        const ttl = await this.redis.ttl(redisKey);

        throw new AppError(
            'Email rate limit exceeded',
            ErrorCode.RATE_LIMIT_EXCEEDED,
            429,
            {
                key,
                retryAfterSeconds: ttl > 0 ? ttl : emailConfig.mailRateLimitWindowSeconds,
                max: emailConfig.mailRateLimitMax,
                windowSeconds: emailConfig.mailRateLimitWindowSeconds
            }
        );
    }

    async send(mailOptions: SendMailOptions, options: SendEmailOptions = {}): Promise<SentMessageInfo> {
        const finalMailOptions: SendMailOptions = {
            ...mailOptions,
            from: mailOptions.from ?? emailConfig.smtpFrom
        };

        if (!options.skipRateLimit) {
            const key = options.rateLimitKey ?? this.buildDefaultRateLimitKey(finalMailOptions);
            await this.enforceRateLimit(key);
        }

        try {
            return await this.transporter.sendMail(finalMailOptions);
        } catch (error: unknown) {
            throw new AppError(
                'Unable to send email via SMTP',
                ErrorCode.INTERNAL_ERROR,
                500,
                {
                    cause: error instanceof Error ? error.message : 'Unknown error'
                }
            );
        }
    }

    async verifyConnection(): Promise<boolean> {
        try {
            await this.transporter.verify();
            return true;
        } catch {
            return false;
        }
    }
}
