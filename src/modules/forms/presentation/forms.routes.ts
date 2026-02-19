import type { FastifyPluginAsync } from "fastify";
import type { SubmitContactUseCase } from "../application/use-cases/submit-contact.usecase.js";
import type { SubmitRequestDemoUseCase } from "../application/use-cases/submit-request-demo.usecase.js";

import { FormsController } from "./forms.controller.js";
import { contactSchema, requestDemoSchema } from "./forms.schema.js";

export const formsRoutes: FastifyPluginAsync = async (fastify) => {
    const { submitContactUseCase, submitRequestDemoUseCase } = fastify.diContainer.cradle as {
        submitContactUseCase: SubmitContactUseCase;
        submitRequestDemoUseCase: SubmitRequestDemoUseCase;
    };
    const formsController = new FormsController(submitContactUseCase, submitRequestDemoUseCase);

    fastify.post('/contact', { schema: contactSchema }, async (request, reply) => {
        await formsController.submitContact(request, reply);
    });

    fastify.post('/request-demo', { schema: requestDemoSchema }, async (request, reply) => {
        await formsController.submitRequestDemo(request, reply);
    });
}