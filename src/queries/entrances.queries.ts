import { gql } from "@apollo/client"


export const CREATE_ENTRANCE = gql`
    mutation CreateEntranceMutation( $input : CreateEntranceInput! ) {
        createEntrance( input : $input ) {
            ok 
            error 
            id 
        }
    }
`

export const UPDATE_ENTRANCE = gql`

    mutation UpdateEntranceMutation( $id : Int! ,  $input : UpdateEntranceInput!) {
        updateEntrance ( id : $id  , input : $input )  {
            ok
            error
        }
    }
 
`

export const ENTRANCE = gql` 

    query EntranceQuery ( $id : Int! ) {
        entrance (id : $id ) {
            ok 
            error 
            result {
                id 
                name
                floors {
                    id 
                    name 
                }
            }
        }
    }

`

export const DUPLICATE_ENTRANCE = gql`

    mutation DuplicateEntraceMutation( $entranceId : Int! ) {
        duplicateEntrance (  entranceId : $entranceId ) {
            ok 
            error
            id
        }
    }


`

export const REMOVE_ENTRANCE = gql`

    mutation RemoveEntranceMutation( $id : Int! ) {
        removeEntrance(id : $id ) {
            ok 
            error 
            id
        }
    }
 
`



