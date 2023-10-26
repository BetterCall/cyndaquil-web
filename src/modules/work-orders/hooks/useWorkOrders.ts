import { useLazyQuery, useQuery } from "@apollo/client";
import { WORK_ORDERS } from '../work-orders.queries';
import { WorkOrdersQuery, WorkOrdersQueryVariables } from '../../../__generated__/WorkOrdersQuery';

export const useWorkOrders = (variables: WorkOrdersQueryVariables, skip = false) => {
    return useQuery<WorkOrdersQuery, WorkOrdersQueryVariables>(WORK_ORDERS, { variables, skip, fetchPolicy: "network-only" });
}

export const useLazyWorkOrders = () => {
    return useLazyQuery<WorkOrdersQuery, WorkOrdersQueryVariables>(WORK_ORDERS, { fetchPolicy: "network-only" });
}