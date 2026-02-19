const productFragment = `
    fragment ProductFragment on Product {
        handle
        title
        productType
        availableForSale
        featuredImage {
            url
            altText
        }
        priceRange {
            minVariantPrice {
                amount
            }
        }
        selectedOrFirstAvailableVariant {
            id
        }
    }
`

export const GET_PRODUCT_BY_HANDLE = `
    query productByHandle($handle: String!) {
        productByHandle(handle: $handle) {
            ...ProductFragment
        }
    }
    ${productFragment}
`

export const GET_PRODUCTS = `
    query products($first: Int!, $after: String) {
        products(first: $first, after: $after) {
            edges {
                node {
                    ...ProductFragment
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
    ${productFragment}
`

export const PREDICTIVE_SEARCH = `
    query predictiveSearch($query: String!) {
        predictiveSearch(query: $query, types: PRODUCT, limit: 10) {
            products {
                ...ProductFragment
            }
        }
    }
    ${productFragment}
`