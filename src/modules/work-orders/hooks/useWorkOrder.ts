import { useQuery } from "@apollo/client";
import { WORK_ORDER } from '../work-orders.queries';
import { WorkOrderQuery, WorkOrderQueryVariables } from '../../../__generated__/WorkOrderQuery';

export const useWorkOrder = (id: number) => {
    return useQuery<WorkOrderQuery, WorkOrderQueryVariables>(WORK_ORDER, { variables: { id } });
}

