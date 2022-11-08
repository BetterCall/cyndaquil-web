import { gql } from '@apollo/client'


export const CREATE_CUSTOMER_CATEGORY = gql`

        mutation CreateCustomerCategoryMutation ( $input : CreateCustomerCategoryInput! ) {
            createCustomerCategory(  input : $input ) {
                ok 
                error 
                id
            }
        }

`

export const UPDATE_CUSTOMER_CATEGORY = gql`

        mutation UpdateCustomerCategoryMutation ( $id : Int! , $input : UpdateCustomerCategoryInput! ) {
            updateCustomerCategory( id : $id , input : $input ) {
                ok 
                error 
            }
        }

`

export const CUSTOMER_CATEGORIES = gql`

query CustomerCategoriesQuery  {
    customerCategories{
        results {
            id
            name
            customersCount
        }
    }
}
`

export const CUSTOMER_CATEGORY = gql`

query CustomerCategoryQuery ( $id : Int! ) {
    customerCategory( id : $id ) {
        ok 
        error 
        result {
            id 
            name
        }
    }
}

`