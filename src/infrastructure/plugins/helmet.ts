import helmet from '@fastify/helmet';
import type { FastifyInstance } from 'fastify';

export const registerHelmet = async (app: FastifyInstance): Promise<void> => {
    await app.register(helmet, {
        global: true,
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    });
};
