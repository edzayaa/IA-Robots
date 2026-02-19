import { MailerService } from '../../infrastructure/mailer.service.js';
import type { DemoRequestEmailData } from '../../application/dto/forms.dto.js';

export class SubmitRequestDemoUseCase {
    constructor(private readonly mailerService: MailerService) { }

    async execute(data: DemoRequestEmailData): Promise<void> {
        await this.mailerService.sendRequestDemoEmail(data);
    }
}