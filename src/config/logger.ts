import { createRequire } from 'node:module';
import { env } from './env.js';

const require = createRequire(import.meta.url);

const resolvePrettyTransport = () => {
    if (env.NODE_ENV !== 'development') {
        return undefined;
    }

    try {
        require.resolve('pino-pretty');
        return {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname'
            }
        };
    } catch {
        return undefined;
    }
};

export const loggerConfig = {
    level: env.LOG_LEVEL,
    transport: resolvePrettyTransport()
};

export type LoggerConfig = typeof loggerConfig;
