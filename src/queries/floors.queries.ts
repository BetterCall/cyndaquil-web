import { gql } from '@apollo/client'

export const FLOORS = gql`

        query FloorsQuery ( $entranceId : Int! ) {
            floors(  entranceId : $entranceId ) {
                ok 
                error

                results {
                    id
                    name
                    type 
                    order
                    emplacements {
                        id 
                        category {
                            id 
                            name 
                        }
                    }
                }

            }
        }

`

export const REORDER_FLOORS = gql`

        mutation ReorderFloorsMutation( $floors : [FloorReordered!]) {
            reorderFloors( floors : $floors) {
                ok 
                error 
            }
        }


`

export const CREATE_FLOOR = gql`

    mutation CreateFloorMutation(  $input : CreateFloorInput! ) {
        createFloor ( input : $input ) {
            ok 
            error
            id
        }
    }


`

export const REMOVE_FLOOR = gql`

    mutation RemoveFloorMutation ( $id : Int! ) {
        removeFloor( id : $id ) {
            ok 
            error
        }
    } 
 
`

export const UPDATE_FLOOR = gql`

    mutation UpdateFloorMutation( $id : Int! ,  $input : UpdateFloorInput!) {
        updateFloor ( id : $id  , input : $input )  {
            ok
            error
        }
    }
 
`


