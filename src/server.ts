import { createApp } from './app.js';
import { appConfig } from '#config/app.js';

const start = async (): Promise<void> => {
    const app = await createApp();

    try {
        await app.listen({
            port: appConfig.port,
            host: '0.0.0.0'
        });
        app.log.info(`Server running on port ${appConfig.port}`);
    } catch (error) {
        app.log.error(error, 'Failed to start server');
        process.exit(1);
    }
};

void start();
