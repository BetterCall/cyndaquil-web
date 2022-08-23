import { gql } from '@apollo/client'

export const CUSTOMER_FRAGMENT = gql`
    fragment CustomerPart on Customer {
        id 
        name
        email 
        phone
        streetNumber
        street
        postal 
        city
        lat 
        lng
    }
`

export const CREATE_CUSTOMER = gql`

    mutation CreateCustomerMutation ( $input  : CreateCustomerInput! ) {
        createCustomer(  input : $input ) {
            ok 
            error
            id
        }
    }

`

export const EDIT_CUSTOMER = gql`

        mutation EditCustomerMutation ( $id : Int! , $input : EditCustomerInput! ) {
            editCustomer( id : $id , input : $input ) {
                ok 
                error 
            }
        }

`

export const CUSTOMERS = gql`

    query CustomersQuery( $limit : Int! , $offset : Int! ,  $where : CustomerFiltersInput!   ) {
        customers( limit : $limit , offset : $offset , where : $where ) {
            hasMore , 
            results {
                ...CustomerPart
                category {
                    id
                    name
                }
            }
        }
    }
    ${CUSTOMER_FRAGMENT}
`


export const CUSTOMER = gql`

query CustomerQuery ( $id : Int! ) {
    customer( id : $id ) {
        ok 
        error 
        result {
            ...CustomerPart
            category {
                id 
                name
            }

            contacts {
                id
                firstname
                lastname
            }
        }
    }
}
${CUSTOMER_FRAGMENT}

`