import { gql } from '@apollo/client'

export const CREATE_SUPPLIER = gql`

    mutation CreateSupplierMutation( $input : CreateSupplierInput! ) {
        createSupplier( input : $input) {
            ok 
            error 
            id
        }
    }
`


export const SUPPLIER = gql`

    query SupplierQuery( $id : Int! ) {
        supplier( id : $id) {
            ok 
            error 
            result {
                id
                name

                streetNumber
                street
                postal 
                city
                lat 
                lng

            }
        }
    }
`


export const REMOVE_SUPPLIER = gql`

    mutation RemoveSupplierMutation( $id : Int! ) {
        removeSupplier( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_SUPPLIER = gql`
    mutation UpdateSupplierMutation( $id : Int! ,  $input : UpdateSupplierInput! ) {
        updateSupplier( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`
export const SUPPLIERS = gql`
    query SuppliersQuery( $limit : Int! , $offset : Int! , $where : SuppliersFiltersInput! ) {
        suppliers( limit : $limit , offset : $offset ,  where: $where  ) {
            hasMore
            results {
                id
                name

                city
                postal
            }
        }
    }

`