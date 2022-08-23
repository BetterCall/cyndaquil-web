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

export const DELETE_CALL = gql`

    mutation DeleteCallMutation( $id : Int! ) {
        deleteCall( id : $id ) {
            ok 
            error
        }
    }

`
export const EDIT_CALL = gql`
    mutation EditCallMutation( $id : Int! ,  $input : EditCallInput! ) {
        editCall( id : $id ,  input : $input ) {
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