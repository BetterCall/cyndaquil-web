import { gql } from '@apollo/client'
import { CUSTOMER_FRAGMENT } from './customers.queries'
import { SITE_FRAGMENT } from './sites.queries'


export const WORK_ORDER_FRAGMENT = gql`
    fragment WorkOrderPart on WorkOrder {
        id 
        name
        description
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

    query WorkOrdersQuery( $limit : Int! , $offset : Int! , $where : WorkOrderFiltersInput! ) {
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

query WorkOrderQuery ( $ id : Int! ) {
    workOrder(  id : $ id ) {
        ok 
        error 
        result {


            ...WorkOrderPart
            site  {
                ...SitePart
            }
            customer  {
                ...CustomerPart
            }
            
            emplacements {
                id
                emplacement {
                    id

                    category {
                        id 
                        name 
                    }

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
                }
            }
        }
    }
}
${WORK_ORDER_FRAGMENT}
${SITE_FRAGMENT}
${CUSTOMER_FRAGMENT}
`
