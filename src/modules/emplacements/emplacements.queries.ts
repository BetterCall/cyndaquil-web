import { gql } from '@apollo/client'


export const CREATE_EMPLACEMENT = gql`

        mutation CreateEmplacementMutation ( $input : CreateEmplacementInput! ) {
            createEmplacement ( input : $input ) {
                ok 
                error 
                id
            }
        }

`

export const REMOVE_EMPLACEMENT = gql`

        mutation RemoveEmplacementMutation( $id : Int! ){
            removeEmplacement ( id : $id ) {
                ok 
                error 
            }
        }

`

export const EMPLACEMENT = gql`
    query EmplacementQuery( $id : Int! ) {
        emplacement ( id : $id ) {
            ok 
            error
            result {
                id
                code
                informations
                building 
                entrance 
                floor

                categoryId
                category {
                    id
                    name
                }

                equipmentId 
                equipment {
                    id
                    code

                    reference{
                        id
                        name
                        brand {
                            id
                            name
                        }
                    }
                }
                
                siteId 
                site{
                    id 
                    name 
                    city
                    postal
                    streetNumber
                    street

                    customerId 
                    customer {
                        id
                        name
                    }
                }
            }
        }
    }

`

export const EMPLACEMENTS = gql`

    query EmplacementsQuery( $limit : Int , $offset : Int , $where : EmplacementsFiltersInput! ) {
        emplacements( limit : $limit , offset : $offset, where : $where  ) {
            hasMore , 
            total,
            results {
                id

                building
                entrance
                floor

                code

                informations

                
                siteId
                site {
                    id
                    name
                }

                categoryId
                category {
                    id 
                    name
                }

                equipmentId
                equipment {
                    id
                    code 
                    
                }
            }
        }
    }
`

export const UPDATE_EMPLACEMENT = gql`

    mutation UpdateEmplacementMutation( $id : Int! , $input : UpdateEmplacementInput! ) {
        updateEmplacement( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`

export const DUPLICATE_BUILDING_EMPLACEMENTS = gql`
    mutation DuplicateBuildingEmplacementsMutation( $input : DuplicateBuildingEmplacementsInput! ) {
        duplicateBuildingEmplacements( input : $input ) {
            ok 
            error
        }
    }

`