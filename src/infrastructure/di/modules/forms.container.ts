import { asClass, type AwilixContainer } from 'awilix';
import { MailerService } from '#modules/forms/infrastructure/mailer.service.js';

export const registerFormsModule = (container: AwilixContainer) => {
    container.register({
        mailerService: asClass(MailerService).singleton(),
    });
};
