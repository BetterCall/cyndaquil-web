import { gql } from '@apollo/client'

export const CREATE_BRAND = gql`

    mutation CreateBrandMutation( $input : CreateBrandInput! ) {
        createBrand( input : $input) {
            ok 
            error 
            id
        }
    }
`


export const BRAND = gql`

    query BrandQuery( $id : Int! ) {
        brand( id : $id) {
            ok 
            error 
            result {
                id
                name
                referencesCount
            }
        }
    }
`


export const REMOVE_BRAND = gql`

    mutation RemoveBrandMutation( $id : Int! ) {
        removeBrand( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_BRAND = gql`
    mutation UpdateBrandMutation( $id : Int! ,  $input : UpdateBrandInput! ) {
        updateBrand( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`
export const BRANDS = gql`
    query BrandsQuery( $limit : Int! , $offset : Int! , $where : BrandsFiltersInput! ) {
        brands( limit : $limit , offset : $offset ,  where: $where  ) {
            hasMore
            results {
                id
                name
                referencesCount
            }
        }
    }

`