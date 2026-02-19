import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';

export const registerSwagger = async (app: FastifyInstance): Promise<void> => {
    await app.register(swagger, {
        openapi: {
            info: {
                title: 'IA Robots API',
                description: 'Fastify + Shopify backend boilerplate',
                version: '1.0.0'
            }
        }
    });

    await app.register(swaggerUi, {
        routePrefix: '/docs'
    });
};
