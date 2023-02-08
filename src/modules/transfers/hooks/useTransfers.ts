import { useLazyQuery, useQuery } from "@apollo/client";
import { TRANSFERS } from '../transfers.queries';
import { TransfersQuery, TransfersQueryVariables } from '../../../__generated__/TransfersQuery';

export const useTransfers = (variables: TransfersQueryVariables, skip = false) => {
    return useQuery<TransfersQuery, TransfersQueryVariables>(TRANSFERS, { variables, skip });
}

export const useLazyTransfers = () => {
    return useLazyQuery<TransfersQuery, TransfersQueryVariables>(TRANSFERS);
}