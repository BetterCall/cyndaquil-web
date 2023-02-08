import { useLazyQuery, useQuery } from "@apollo/client";
import { DEMANDS } from '../demands.queries';
import { DemandsQuery, DemandsQueryVariables } from '../../../__generated__/DemandsQuery';

export const useDemands = (variables: DemandsQueryVariables) => {
    return useQuery<DemandsQuery, DemandsQueryVariables>(DEMANDS, { variables });
}

export const useLazyDemands = () => {
    return useLazyQuery<
        DemandsQuery,
        DemandsQueryVariables
    >(DEMANDS);
}