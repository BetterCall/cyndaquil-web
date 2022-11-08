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

query EquipmentQuery ( $ id : Int! ) {
    equipment(  id : $ id ) {
        ok 
        error 
        result {
            id
            category {
                id 
                name
            }
        }
    }
}
`
