export const customerAccessTokenCreateSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    },
    required: ['email', 'password'],
    additionalProperties: false
} as const;

export const customerCreateSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        confirmPassword: { type: 'string', minLength: 6 },
        acceptTerms: { type: 'boolean', const: true }
    },
    required: ['email', 'password', 'confirmPassword', 'acceptTerms'],
    additionalProperties: false
} as const; 

export const customerRecoverSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' }
    },
    required: ['email'],
    additionalProperties: false
} as const;

export const customerResetSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 1 },
        resetToken: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 6 }
    },
    required: ['id', 'resetToken', 'password'],
    additionalProperties: false
} as const;

export const customerActivateSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 1 },
        activationToken: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 6 }
    },
    required: ['id', 'activationToken', 'password'],
    additionalProperties: false
} as const;