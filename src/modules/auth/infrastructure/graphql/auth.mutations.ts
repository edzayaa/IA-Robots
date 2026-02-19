export const customerAccessTokenCreate = `
    mutation customerAccessTokenCreate ($input: CustomerAccessTokenCreateInput!) @inContext(language: AR, country: KW) {
        customerAccessTokenCreate(input: $input) {
            customerAccessToken {
                accessToken
            }
            customerUserErrors {
                code
                message
            }
        }
    }
`;

export const customerCreate = `
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer {
                email
            }
            customerUserErrors {
                code
                message
            }
        }
    }
`;

export const customerAccessTokenDelete = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
            deletedAccessToken
            userErrors {
                message
            }
        }
    }
`;

export const customerRecover = `
    mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
            customerUserErrors {
                code
                message
            }
        }
    }
`;

export const customerReset = `
    mutation customerReset($id: ID!, $input: CustomerResetInput!) {
        customerReset(id: $id, input: $input) {
            customerUserErrors {
                code
                message
            }   
        }
    }
`;

export const customerActivate = `
mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
        customerUserErrors {
            code
            message
        }
    }
}
`;