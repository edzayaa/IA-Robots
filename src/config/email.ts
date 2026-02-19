import { env } from './env.js';

const parseRecipients = (value: string): string[] => value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export const emailConfig = {
    smtpHost: env.SMTP_HOST,
    smtpPort: env.SMTP_PORT,
    smtpSecure: env.SMTP_SECURE,
    smtpUser: env.SMTP_USER,
    smtpPass: env.SMTP_PASS,
    smtpFrom: env.SMTP_FROM,
    contactEmailTo: parseRecipients(env.CONTACT_EMAIL_TO),
    mailRateLimitMax: env.MAIL_RATE_LIMIT_MAX,
    mailRateLimitWindowSeconds: env.MAIL_RATE_LIMIT_WINDOW_SECONDS
} as const;

export type EmailConfig = typeof emailConfig;
