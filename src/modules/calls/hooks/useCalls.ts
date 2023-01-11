import { useLazyQuery, useQuery } from "@apollo/client";
import { CALLS } from '../calls.queries';
import { CallsQuery, CallsQueryVariables } from '../../../__generated__/CallsQuery';

export const useCalls = (variables: CallsQueryVariables) => {
    return useQuery<CallsQuery, CallsQueryVariables>(CALLS, { variables });
}

export const useLazyCalls = () => {
    return useLazyQuery<
        CallsQuery,
        CallsQueryVariables
    >(CALLS);
}