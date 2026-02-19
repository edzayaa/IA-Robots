import { createContainer, InjectionMode } from 'awilix';
import type { Cradle } from '@fastify/awilix';
import { registerInfra } from './infra.container.js';
import { registerApplication } from './application.container.js';
import { registerAuthModule } from './modules/auth.container.js';
import { registerProductsModule } from './modules/products.container.js';
import { registerFormsModule } from './modules/forms.container.js';

export const container = createContainer<Cradle>({
	injectionMode: InjectionMode.CLASSIC
});

registerInfra(container);
registerAuthModule(container);
registerProductsModule(container);
registerFormsModule(container);
registerApplication(container);
