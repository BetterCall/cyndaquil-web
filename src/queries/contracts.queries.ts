import { gql } from '@apollo/client'
import { CUSTOMER_FRAGMENT } from './customers.queries'
import { SITE_FRAGMENT } from './sites.queries'


export const GENERATE_CONTRACT = gql`

    mutation GenerateContractMutation( $input : GenerateContractInput! ) {
        generateContract( input : $input ) {
            ok 
            error 
            id
        }
    }

`


export const CONTRACTS = gql`

query ContractsQuery( $limit : Int! , $offset : Int! , $where : ContractFiltersInput! ) {
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
            emplacement {
                id
                floor {
                    id
                    name

                    entrance {
                        id
                        name

                        building {
                            id 
                            name
                        }
                    }
                }
                category {
                    id
                    name
                }
            }
        }
      }
    }
  }
  ${CUSTOMER_FRAGMENT}
  ${SITE_FRAGMENT}
 
  `