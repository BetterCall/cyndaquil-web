import { gql } from '@apollo/client'


export const CREATE_EQUIPMENT_CATEGORY = gql`

        mutation CreateEquipmentCategoryMutation ( $input : CreateEquipmentCategoryInput! ) {
            createEquipmentCategory(  input : $input ) {
                ok 
                error 
                id
            }
        }

`

export const UPDATE_EQUIPMENT_CATEGORY = gql`

        mutation UpdateEquipmentCategoryMutation ( $id : Int! , $input : UpdateEquipmentCategoryInput! ) {
            updateEquipmentCategory( id : $id , input : $input ) {
                ok 
                error 
            }
        }

`

export const EQUIPMENT_CATEGORIES = gql`

query EquipmentCategoriesQuery  {
    equipmentCategories{
        results {
            id
            name

            benefits {
                id
                name
                price 
            }
        }
    }
}
`

export const EQUIPMENT_CATEGORY = gql`

query EquipmentCategoryQuery ( $id : Int! ) {
    equipmentCategory( id : $id ) {
        ok 
        error 
        result {
            id 
            name

            benefits  {
                id
                name 
                price

                taxe {
                    id
                    name
                    value
                }
            }
        }
    }
}

`