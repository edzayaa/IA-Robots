import type { FastifyRequest, FastifyReply } from 'fastify';
import { ok } from '#shared/http/response-mapper.js';
import { SubmitContactUseCase } from '../application/use-cases/submit-contact.usecase.js';
import { SubmitRequestDemoUseCase } from '../application/use-cases/submit-request-demo.usecase.js';
import type { ContactFormEmailData, DemoRequestEmailData } from '../application/dto/forms.dto.js';

export class FormsController {
    constructor(
        private readonly submitContactUseCase: SubmitContactUseCase,
        private readonly submitRequestDemoUseCase: SubmitRequestDemoUseCase
    ) { }

    async submitContact(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const data = request.body as ContactFormEmailData;
        await this.submitContactUseCase.execute(data);
        reply.send(ok({ message: 'Contact form submitted successfully' }));
    }

    async submitRequestDemo(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const data = request.body as DemoRequestEmailData;
        await this.submitRequestDemoUseCase.execute(data);
        reply.send(ok({ message: 'Demo request submitted successfully' }));
    }
}