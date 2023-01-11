import { gql } from '@apollo/client'

export const CREATE_TAXE = gql`

    mutation CreateTaxeMutation( $input : CreateTaxeInput! ) {
        createTaxe( input : $input) {
            ok 
            error 
            id
        }
    }
`

export const TAXE = gql`

    query TaxeQuery( $id : Int! ) {
        taxe( id : $id) {
            ok 
            error 
            result {
                id
                name
                value
            }
        }
    }
`


export const REMOVE_TAXE = gql`

    mutation RemoveTaxeMutation( $id : Int! ) {
        removeTaxe( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_TAXE = gql`
    mutation UpdateTaxeMutation( $id : Int! ,  $input : UpdateTaxeInput! ) {
        updateTaxe( id : $id ,  input : $input ) {
            ok 
            error
        }
    }
`

export const TAXES = gql`
    query TaxesQuery {
        taxes {
            hasMore
            results {
                id
                name 
                value
            }
        }
    }

`