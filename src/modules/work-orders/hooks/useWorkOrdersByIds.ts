import { useLazyQuery, useQuery } from "@apollo/client";
import { WORK_ORDERS_BY_IDS } from '../work-orders.queries';
import { WorkOrdersByIdsQuery, WorkOrdersByIdsQueryVariables } from '../../../__generated__/WorkOrdersByIdsQuery';

export const useWorkOrdersByIds = (variables: WorkOrdersByIdsQueryVariables, skip = false) => {
    return useQuery<WorkOrdersByIdsQuery, WorkOrdersByIdsQueryVariables>(WORK_ORDERS_BY_IDS, { variables, skip });
}

export const useLazyWorkOrdersByIds = () => {
    return useLazyQuery<WorkOrdersByIdsQuery, WorkOrdersByIdsQueryVariables>(WORK_ORDERS_BY_IDS);
}