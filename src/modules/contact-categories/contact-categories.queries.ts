import { gql } from '@apollo/client'


export const CREATE_CONTACT_CATEGORY = gql`
        mutation CreateContactCategoryMutation ( $input : CreateContactCategoryInput! ) {
            createContactCategory(  input : $input ) {
                ok 
                error 
                id
            }
        }
`
export const UPDATE_CONTACT_CATEGORY = gql`
        mutation UpdateContactCategoryMutation ( $id : Int! , $input : UpdateContactCategoryInput! ) {
            updateContactCategory( id : $id , input : $input ) {
                ok 
                error 
            }
        }
`

export const CONTACT_CATEGORIES = gql`
    query ContactCategoriesQuery  {
        contactCategories{
            results {
                id
                name
                contactsCount
            }
        }
    }
`

export const CONTACT_CATEGORY = gql`
    query ContactCategoryQuery ( $id : Int! ) {
        contactCategory( id : $id ) {
            ok 
            error 
            result {
                id 
                name
            }
        }
    }
`