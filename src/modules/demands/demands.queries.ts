import { gql } from '@apollo/client'

export const CREATE_DEMAND = gql`

    mutation CreateDemandMutation( $input : CreateDemandInput! ) {
        createDemand( input : $input) {
            ok 
            error 
            id
        }
    }
`

export const REMOVE_DEMAND = gql`

    mutation RemoveDemandMutation( $id : Int! ) {
        removeDemand( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_DEMAND = gql`
    mutation UpdateDemandMutation( $id : Int! ,  $input : UpdateDemandInput! ) {
        updateDemand( id : $id ,  input : $input ) {
            ok 
            error
        }
    }
`

export const RESOLVE_DEMAND = gql`
    mutation ResolveDemandMutation( $id : Int! ,  $input : ResolveDemandInput! ) {
        resolveDemand( id : $id ,  input : $input ) {
            ok 
            error
        }
    }
`

export const DEMANDS = gql`
    query DemandsQuery( $limit : Int! , $offset : Int! , $where : DemandsFiltersInput! ) {
        demands( limit : $limit , offset : $offset ,  where: $where  ) {
            hasMore
            results {
                id
                type

                openedById
                openedBy {
                    id
                    firstname
                    lastname
                }

                targetUserId
                targetUser {
                    id 
                    firstname
                    lastname
                }

                customerId
                customer {
                    id
                    name
                }

                siteId
                site {
                    id
                    name
                    city
                }
            }
        }
    }

`


export const DEMAND = gql`

query DemandQuery( $id : Int! ) {
    demand( id : $id ) {
        ok 
        error 
        result {
            id
            type
            object
            report
            treated
            message

            openedById
            openedBy {
                id
                firstname
                lastname
            }

            targetUserId
            targetUser {
                id 
                firstname
                lastname
            }

            customerId
            customer {
                id
                name
            }

            siteId
            site {
                id
                name
                city
            }
        }
       
    }
}
`