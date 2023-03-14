import { gql } from '@apollo/client'

export const WORK_ORDER_ROWS = gql`

    query WorkOrderRowsQuery( $limit : Int , $offset : Int , $where : WorkOrderRowFiltersInput! ) {
        workOrderRows( limit : $limit , offset : $offset, where : $where  ) {
            ok 
            error 

            results{
                id
                done
                comment

                status

                workOrderId 
                workOrder {
                    id 
                    date
                    start
                }

                emplacementId
                emplacement {
                    id

                    code
                    
                    building
                    entrance
                    floor

                    equipmentId
                    equipment {
                        id 
                        code
                    }

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

export const UPDATE_WORK_ORDER_ROW = gql`

    mutation UpdateWorkOrderRowMutation( $id : Int! , $input : UpdateWorkOrderRowInput! ) {
        updateWorkOrderRow( id : $id , input : $input ) {
            ok 
            error 
        }
    }
`
