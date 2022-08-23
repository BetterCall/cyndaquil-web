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

export const EDIT_CUSTOMER_CATEGORY = gql`

        mutation EditCustomerCategoryMutation ( $id : Int! , $input : EditCustomerCategoryInput! ) {
            editCustomerCategory( id : $id , input : $input ) {
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