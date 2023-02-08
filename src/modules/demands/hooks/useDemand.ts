import { useQuery } from "@apollo/client";
import { DEMAND } from '../demands.queries';
import { DemandQuery, DemandQueryVariables } from '../../../__generated__/DemandQuery';

export const useDemand = (id: number) => {
    return useQuery<DemandQuery, DemandQueryVariables>(DEMAND, { variables: { id } });
}

