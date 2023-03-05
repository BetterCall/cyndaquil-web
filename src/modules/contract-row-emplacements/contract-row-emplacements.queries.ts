import { gql } from '@apollo/client'

export const CONTRACT_ROW_EMPLACEMENTS = gql`

    query ContractRowEmplacementsQuery( $limit : Int , $offset : Int , $where : ContractRowEmplacementFiltersInput! ) {
        contractRowEmplacements( limit : $limit , offset : $offset, where : $where  ) {
            ok 
            error 
            results{
                id

                emplacementId
                emplacement {
                    id

                    building
                    entrance
                    floor
                }

                contractRowId
                contractRow {
                    id
                    contractId 
                    contract {
                        id 
                    }
                }
            }
        }
    }
`