import Fastify, { type FastifyInstance } from 'fastify';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import { asFunction, asValue } from 'awilix';
import { loggerConfig } from '#config/logger.js';
import { container } from '#infrastructure/di/core.js';
import { registerCors } from '#infrastructure/plugins/cors.js';
import { registerHelmet } from '#infrastructure/plugins/helmet.js';
import { registerRateLimit } from '#infrastructure/plugins/rate-limit.js';
import { registerRedis } from '#infrastructure/plugins/redis.js';
import { registerSensible } from '#infrastructure/plugins/sensible.js';
import { registerSwagger } from '#infrastructure/plugins/swagger.js';
import { setGlobalErrorHandler } from '#shared/errors/handler.js';
import { CacheService } from '#shared/cache/cache.service.js';
import { SmtpMailerHelper } from '#shared/email/smtp-mailer.helper.js';

// Routes
import { productsRoutes } from '#modules/products/presentation/products.routes.js';
import { formsRoutes } from '#modules/forms/presentation/forms.routes.js';
import { authRoutes } from '#modules/auth/presentation/auth.routes.js';

export const createApp = async (): Promise<FastifyInstance> => {
    const app = Fastify({
        logger: loggerConfig,
        routerOptions: {
            maxParamLength: 512
        }
    });

    await app.register(fastifyAwilixPlugin, {
        container,
        disposeOnClose: true,
        disposeOnResponse: true
    });

    await registerSensible(app);
    await registerHelmet(app);
    await registerCors(app);
    await registerRedis(app);
    await registerRateLimit(app);
    await registerSwagger(app);

    setGlobalErrorHandler(app);

    app.addHook('onReady', async () => {
        container.register('redis', asValue(app.redis));
        container.register('cacheService', asFunction(() => new CacheService(app.redis)).singleton());
        container.register('smtpMailerHelper', asFunction(() => new SmtpMailerHelper(app.redis)).singleton());
    });

    await app.register(productsRoutes, { prefix: '/api' });
    await app.register(formsRoutes, { prefix: '/api' });
    await app.register(authRoutes, { prefix: '/api/auth' });

    return app;
};
