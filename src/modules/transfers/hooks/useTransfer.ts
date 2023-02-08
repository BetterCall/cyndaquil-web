import { useQuery } from "@apollo/client";
import { TRANSFER } from '../transfers.queries';
import { TransferQuery, TransferQueryVariables } from '../../../__generated__/TransferQuery';

export const useTransfer = (id: number) => {
    return useQuery<TransferQuery, TransferQueryVariables>(TRANSFER, { variables: { id } });
}

