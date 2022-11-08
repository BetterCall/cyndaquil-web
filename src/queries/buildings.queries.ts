import { gql } from '@apollo/client'

export const CREATE_BUILDING = gql`

        mutation CreateBuildingMutation ( $input : CreateBuildingInput! ) {
            createBuilding(  input : $input ) {
                ok 
                error 
                id
            }
        }

`

export const UPDATE_BUILDING = gql`
        mutation UpdateBuildingMutation ( $id : Int!,  $input : UpdateBuildingInput! ) {
            updateBuilding( id : $id, input : $input ) {
                ok 
                error 
            }
        }
`


export const REMOVE_BUILDING = gql`


        mutation RemoveBuildingMutation($id : Int! ) {
            removeBuilding( id : $id ) {
                ok 
                error
            }
            
        }


`


export const BUILDING = gql`

        query BuildingQuery( $id : Int! ) {
            building( id : $id ) {
                ok 
                error 
                result {
                    id
                    name
                    
                    entrances {
                        id
                        name 
                    }
                }
            }
        }
`



export const DUPLICATE_BUILDING = gql`

        mutation DuplicateBuildingMutation( $buildingId : Int! ) {
            duplicateBuilding( buildingId : $buildingId ) {
                ok 
                error 
            }
        }

`