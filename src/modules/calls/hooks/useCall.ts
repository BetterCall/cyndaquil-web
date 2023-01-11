import { useQuery } from "@apollo/client";
import { CALL } from '../calls.queries';
import { CallQuery, CallQueryVariables } from '../../../__generated__/CallQuery';

export const useCall = (id: number) => {
    return useQuery<CallQuery, CallQueryVariables>(CALL, { variables: { id } });
}

