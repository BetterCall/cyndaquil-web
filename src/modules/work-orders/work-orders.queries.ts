import { gql } from '@apollo/client'

export const WORK_ORDER_FRAGMENT = gql`
    fragment WorkOrderPart on WorkOrder {
        id 
        object
        description
        billable
        appointment
        imperative
        type
        date
        start
        end
        status
        lat
        lng
        streetNumber
        street
        postal 
        city


    }
`

export const CREATE_WORK_ORDER = gql`

        mutation CreateWorkOrderMutation ( $input : CreateWorkOrderInput! ) {
            createWorkOrder(  input : $input ) {
                ok 
                error
                id
            }
        }

`
export const UPDATE_WORK_ORDER = gql`

        mutation UpdateWorkOrderMutation ( $ id : Int! , $input : UpdateWorkOrderInput! ) {
            updateWorkOrder(  id : $ id , input : $input ) {
                ok 
                error
            }
        }

`

export const WORK_ORDERS = gql`

    query WorkOrdersQuery( $limit : Int , $offset : Int , $where : WorkOrderFiltersInput! ) {
        workOrders( limit : $limit , offset : $offset, where : $where  ) {
            hasMore , 
            results {
                ...WorkOrderPart

                user {
                    id
                    firstname
                    lastname
                }

                customer {
                    id 
                    name 
                    category {
                        id 
                        name
                    }
                }

                site {
                    id 
                    name 
                }
            }
        }
    }
    ${WORK_ORDER_FRAGMENT}
`

export const WORK_ORDER = gql`

query WorkOrderQuery ( $id : Int! ) {
    workOrder(  id : $id ) {
        ok 
        error 
        result {
            ...WorkOrderPart

            invoiceId 
            invoice {
                id
                totalPrice
            }

            userId
            user {
                id
                firstname
                lastname
            }

            siteId
            site  {
                id
                name
            }

            customerId 
            customer  {
                id 
                name
                phone
                email
            }
            
            rows {
                id
                done
                comment
                emplacementId 
                emplacement {
                    id

                    category {
                        id 
                        name 
                    }

                    building
                    entrance
                    floor
                }

                benefitId
                benefit {
                    id
                    name
                }
            }
        }
    }
}
${WORK_ORDER_FRAGMENT}
`


export const GENERATE_FROM_CONTRACT = gql`

    mutation GenerateFromContractMutation ( $input : GenerateFromContractInput! ) {
        generateFromContract( input : $input ) {
            id
            ok
            error
        }
    }
`


export const GENERATE_FROM_WORK_ORDER = gql`

    mutation GenerateFromWorkOrderMutation ( $input : GenerateFromWorkOrderInput! ) {
        generateFromWorkOrder( input : $input ) {
            id
            ok
            error
        }
    }

`