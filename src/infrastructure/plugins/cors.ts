import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import { appConfig } from '#config/app.js';

export const registerCors = async (app: FastifyInstance): Promise<void> => {
    await app.register(cors, {
        origin: appConfig.corsOrigin
    });
};
