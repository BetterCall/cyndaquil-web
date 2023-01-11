import { useLazyQuery, useQuery } from "@apollo/client";
import { BUGS } from '../bugs.queries';
import { BugsQuery, BugsQueryVariables } from '../../../__generated__/BugsQuery';

export const useBugs = (variables: BugsQueryVariables) => {
    return useQuery<BugsQuery, BugsQueryVariables>(BUGS, { variables });
}

export const useLazyBugs = () => {
    return useLazyQuery<
        BugsQuery,
        BugsQueryVariables
    >(BUGS);
}