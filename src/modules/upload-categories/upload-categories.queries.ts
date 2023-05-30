import { gql } from '@apollo/client'

export const CREATE_UPLOAD_CATEGORY = gql`
    mutation CreateUploadCategoryMutation ( $input : CreateUploadCategoryInput! ) {
        createUploadCategory(  input : $input ) {
            ok 
            error 
            id
        }
    }
`

export const UPDATE_UPLOAD_CATEGORY = gql`
    mutation UpdateUploadCategoryMutation ( $id : Int! , $input : UpdateUploadCategoryInput! ) {
        updateUploadCategory( id : $id , input : $input ) {
            ok 
            error 
        }
    }
`

export const UPLOAD_CATEGORIES = gql`
    query UploadCategoriesQuery  {
        uploadCategories{
            results {
                id
                name
            }
        }
    }
`

export const UPLOAD_CATEGORY = gql`
    query UploadCategoryQuery ( $id : Int! ) {
        uploadCategory( id : $id ) {
            ok 
            error 
            result {
                id 
                name
            }
        }
    }
`