import { gql } from '@apollo/client'

export const WORK_ORDER_ROWS = gql`

    query WorkOrderRowsQuery( $limit : Int , $offset : Int , $where : WorkOrderRowFiltersInput! ) {
        workOrderRows( limit : $limit , offset : $offset, where : $where  ) {
            ok 
            error 
            results{
                id
                done

                workOrderId 
                workOrder {
                    id 
                    date
                    start
                }

                emplacementId
                emplacement {
                    id

                    building
                    entrance
                    floor

                    siteId 
                    site {
                        id
                        name
                        city 
                    }

                    categoryId
                    category {
                        id
                        name
                    }
                }

                benefitId
                benefit {
                    id
                    name
                }
            }
        }
    }
`