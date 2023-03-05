import { useLazyQuery, useQuery } from "@apollo/client";
import { WORK_ORDER_ROWS } from '../work-order-rows.queries';
import { WorkOrderRowsQuery, WorkOrderRowsQueryVariables } from '../../../__generated__/WorkOrderRowsQuery';

export const useWorkOrderRows = (variables: WorkOrderRowsQueryVariables) => {
    return useQuery<WorkOrderRowsQuery, WorkOrderRowsQueryVariables>(WORK_ORDER_ROWS, { variables });
}

export const useLazyWorkOrderRows = () => {
    return useLazyQuery<WorkOrderRowsQuery, WorkOrderRowsQueryVariables>(WORK_ORDER_ROWS);
}