import { gql } from '@apollo/client'

export const CREATE_TRADUCTION = gql`

    mutation CreateTraductionMutation( $input : CreateTraductionInput! ) {
        createTraduction( input : $input) {
            ok 
            error 
            id
        }
    }
`


export const TRADUCTION = gql`

    query TraductionQuery( $id : Int , $key : String ) {
        traduction( id : $id , key : $key ) {
            ok 
            error 
            result {
                id
                key
                value
            }
        }
    }
`


export const REMOVE_TRADUCTION = gql`

    mutation RemoveTraductionMutation( $id : Int! ) {
        removeTraduction( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_TRADUCTION = gql`
    mutation UpdateTraductionMutation( $id : Int! ,  $input : UpdateTraductionInput! ) {
        updateTraduction( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`
export const TRADUCTIONS = gql`
    query TraductionsQuery( $where : TraductionsFiltersInput! ) {
        traductions( where: $where  ) {
            results {
                id
                key
                value
            }
        }
    }

`