import { gql } from "@apollo/client"


export const CONTROL = gql`

query ControlQuery( $id : Int! ) {
    control( id : $id ) {
        ok 
        error 
        result {
            id
        }
    }
}
`

export const CONTROLS = gql`

    query ControlsQuery( $limit : Int , $offset : Int  , $where : ControlFiltersInput! ) {
        controls ( limit : $limit , offset : $offset , where : $where ) {
            hasMore 
            results  {
                id
                
                userId 
                user {
                    id
                    firstname 
                    lastname 

                }

                createdAt
            }
        }
    }
`

export const CREATE_CONTROL = gql`

    mutation CreateControlMutation( $input : CreateControlInput! ) {
        createControl( input : $input ){
            ok 
            error
            id
        }
    }

`


export const REMOVE_CONTROL = gql`

    mutation RemoveControlMutation( $id :Int !  ) {
        removeControl( id : $id ) {
            ok 
            error 
        }
    }
`

export const UPDATE_BUG = gql`

    mutation UpdateControlMutation( $id :Int! , $input : UpdateControlInput! ) {
        updateControl( id : $id  , input : $input ) {
            ok
            error
        }
    }

`