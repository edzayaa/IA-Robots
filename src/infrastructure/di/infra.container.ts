import { asClass, asValue, type AwilixContainer } from 'awilix';
import { StorefrontClient } from '#infrastructure/shopify/storefront.js';
import { CacheService } from '#shared/cache/cache.service.js';
import { SmtpMailerHelper } from '#shared/email/smtp-mailer.helper.js';
import { appConfig } from '#config/app.js';
import { emailConfig } from '#config/email.js';
import { loggerConfig } from '#config/logger.js';
import { shopifyConfig } from '#config/shopify.js';

export const registerInfra = (container: AwilixContainer) => {
    container.register({
        appConfig: asValue(appConfig),
        emailConfig: asValue(emailConfig),
        loggerConfig: asValue(loggerConfig),
        shopifyConfig: asValue(shopifyConfig),

        redis: asValue(null),

        storefrontClient: asClass(StorefrontClient).singleton(),
        cacheService: asClass(CacheService).singleton(),
        smtpMailerHelper: asClass(SmtpMailerHelper).singleton(),
    });
};
