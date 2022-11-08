import { gql } from '@apollo/client'

export const CREATE_CALL = gql`

    mutation CreateCallMutation( $input : CreateCallInput! ) {
        createCall( input : $input) {
            ok 
            error 
            id
        }
    }
`

export const REMOVE_CALL = gql`

    mutation RemoveCallMutation( $id : Int! ) {
        removeCall( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_CALL = gql`
    mutation UpdateCallMutation( $id : Int! ,  $input : UpdateCallInput! ) {
        updateCall( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`
export const CALLS = gql`
    query CallsQuery( $limit : Int! , $offset : Int! , $where : CallsFiltersInput! ) {
        calls( limit : $limit , offset : $offset ,  where: $where  ) {
            hasMore
            results {
                id
                user {
                    id 
                    firstname
                    lastname
                }
                customer {
                    id
                    name
                }
                site {
                    id
                    name
                    city
                }
            }
        }
    }

`