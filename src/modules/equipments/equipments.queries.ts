import { gql } from '@apollo/client'



export const CREATE_EQUIPMENT = gql`

        mutation CreateEquipmentMutation ( $input : CreateEquipmentInput! ) {
            createEquipment(  input : $input ) {
                ok 
                error
                id
            }
        }

`

export const UPDATE_EQUIPMENT = gql`

        mutation UpdateEquipmentMutation ( $ id : Int! , $input : UpdateEquipmentInput! ) {
            updateEquipment(  id : $ id , input : $input ) {
                ok 
                error
            }
        }

`


export const EQUIPMENTS = gql`

    query EquipmentsQuery( $limit : Int! , $offset : Int! , $where : EquipmentFiltersInput! ) {
        equipments( limit : $limit , offset : $offset, where : $where  ) {
            hasMore , 
            results {
                id
                category {
                    id 
                    name
                }

                reference  {
                    id 
                    name 
                    
                }
            }
        }
    }
`

export const EQUIPMENT = gql`

query EquipmentQuery ( $where  : EquipmentInput! ) {
    equipment(  where : $where ) {
        ok 
        error 
        result {
            id
            code
            informations
            categoryId
            category {
                id 
                name
            }

            referenceId
            reference {
                id 
                name
                brand {
                    id 
                    name
                }
            }

            emplacement {
                id
                informations

                siteId 
                site {
                    id 
                    name
                    city
                }
                building
                entrance
                floor
            }
            
            controls {
                id 
                comment 
                user {
                    id 
                    firstname
                    lastname
                }
                createdAt
            }
        
        }
    }
}
`
