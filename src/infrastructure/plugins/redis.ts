import fastifyRedis from '@fastify/redis';
import type { FastifyInstance } from 'fastify';
import { appConfig } from '#config/app.js';

export const registerRedis = async (app: FastifyInstance): Promise<void> => {
    await app.register(fastifyRedis, {
        url: appConfig.redisUrl,
        lazyConnect: true
    });
};
