import { gql } from '@apollo/client'



export const EMPLACEMENT_CONTRACTS = gql`

    query EmplacementContractsQuery ( $emplacementId : Int! ) {
        emplacementContracts( emplacementId : $emplacementId) {
            ok 
            error
            results {
                id
                contract {
                    id 
                    name 
                    status
                 }
           
            }
        }
    }


`