export const getProductByHandleParamsSchema = {
    type: 'object',
    properties: {
        handle: { type: 'string', minLength: 1 }
    },
    required: ['handle'],
    additionalProperties: false
} as const;

export const predictiveSearchQuerySchema = {
    type: 'object',
    properties: {
        query: { type: 'string', minLength: 1 }
    },
    required: ['query'],
    additionalProperties: false
} as const;