import { gql } from '@apollo/client'
import { CUSTOMER_FRAGMENT } from './customers.queries'
import { SITE_FRAGMENT } from './sites.queries'


export const WORK_ORDER_FRAGMENT = gql`
    fragment WorkOrderPart on WorkOrder {
        id 
        name
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

export const EDIT_WORK_ORDER = gql`

        mutation EditWorkOrderMutation ( $ id : Int! , $input : EditWorkOrderInput! ) {
            editWorkOrder(  id : $ id , input : $input ) {
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
        }
    }
}
${WORK_ORDER_FRAGMENT}
${SITE_FRAGMENT}
${CUSTOMER_FRAGMENT}
`
