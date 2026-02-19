import { MailerService } from '../../infrastructure/mailer.service.js';
import type { ContactFormEmailData } from '../../application/dto/forms.dto.js';

export class SubmitContactUseCase {
    constructor(private readonly mailerService: MailerService) { }

    async execute(data: ContactFormEmailData): Promise<void> {
        await this.mailerService.sendContactFormEmail(data);
    }
}