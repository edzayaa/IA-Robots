import sensible from '@fastify/sensible';
import type { FastifyInstance } from 'fastify';

export const registerSensible = async (app: FastifyInstance): Promise<void> => {
    await app.register(sensible);
};
