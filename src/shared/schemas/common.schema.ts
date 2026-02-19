export const commonString = {
    type: 'string',
    minLength: 1,
} as const;

export const nameString = {
    type: 'string',
    minLength: 2,
    maxLength: 120
} as const;

export const emailString = {
    type: 'string',
    format: 'email',
    maxLength: 254
} as const;

export const phoneString = {
    type: 'string',
    minLength: 7,
    maxLength: 20,
    pattern: '^\\+?[0-9()\\-\\s]{7,20}$'
} as const;
