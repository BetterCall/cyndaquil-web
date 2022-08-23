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



