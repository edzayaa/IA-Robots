import { commonString, nameString, emailString, phoneString } from '#shared/schemas/common.schema.js';

export const contactSchema = {
    body: {
        type: 'object',
        required: ['name', 'job', 'email', 'phone', 'message'],
        properties: {
            name: nameString,
            job: {
                ...commonString,
                maxLength: 100
            },
            email: emailString,
            phone: phoneString,
            message: {
                type: 'string',
                minLength: 10,
                maxLength: 3000
            }
        },
        additionalProperties: false
    }
} as const;

export const requestDemoSchema = {
    body: {
        type: 'object',
        required: ['name', 'company', 'email', 'country', 'industry', 'robotsOfInterest'],
        properties: {
            name: nameString,
            company: {
                ...commonString,
                maxLength: 160
            },
            email: emailString,
            country: {
                ...commonString,
                maxLength: 80
            },
            industry: {
                ...commonString,
                maxLength: 80
            },
            robotsOfInterest: {
                type: 'array',
                minItems: 1,
                maxItems: 20,
                items: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 120
                }
            }
        },
        additionalProperties: false
    }
} as const;
