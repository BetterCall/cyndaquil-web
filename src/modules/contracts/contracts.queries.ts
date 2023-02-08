import { gql } from '@apollo/client'
import { CUSTOMER_FRAGMENT } from '../customer/customers.queries'
import { SITE_FRAGMENT } from '../sites/sites.queries'


export const CREATE_CONTRACT = gql`

    mutation CreateContractMutation( $input : CreateContractInput! ) {
        createContract( input : $input ) {
            ok 
            error 
            id
        }
    }

`

export const CONTRACTS = gql`

query ContractsQuery( $limit : Int  , $offset : Int  , $where : ContractFiltersInput! ) {
    contracts( limit : $limit , offset : $offset, where : $where  ) {
        hasMore , 
        results {
            id
            name
            status
            customer {
                id
                name 

            }
            site {
                id 
                name
            }

            madeBy {
                id
                firstname
                lastname
            }
        }
    }
}

`

export const CONTRACT = gql`
 query ContractQuery ( $id  : Int! ) {
    contract(id: $id ) {
      ok
      error
      result {
        id
        status

        equipmentCount
        price 
        taxPrice
        
        customer {
            ...CustomerPart
            category {
                id 
                name
            }
        }
        site {
            ...SitePart
        }


        rows {
            id
            unitPrice
            quantity
            taxe
            taxPrice
            totalPrice

            benefit {
                id
                name
            }

            emplacements {
                id 
                emplacement {
                    building
                    entrance
                    floor
                }
            }
           
        }
      }
    }
  }
  ${CUSTOMER_FRAGMENT}
  ${SITE_FRAGMENT}
 
  `


export const UPDATE_CONTRACT = gql`

    mutation UpdateContractMutation ( $id : Int! , $input : UpdateContractInput! ) {
        updateContract ( id : $id , input : $input )  {
            ok 
            error
        }
    }

`