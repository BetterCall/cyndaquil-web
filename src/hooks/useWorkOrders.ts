import React from 'react'
import { useLazyQuery } from "@apollo/client";
import { WorkOrdersQuery, WorkOrdersQueryVariables } from '../__generated__/WorkOrdersQuery';
import { WORK_ORDERS } from '../queries/work-orders.queries';


export const useLazyWorkOrders = () => {
    return useLazyQuery<WorkOrdersQuery, WorkOrdersQueryVariables>(WORK_ORDERS);
}