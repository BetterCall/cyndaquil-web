import { useQuery } from "@apollo/client";
import { BUG } from '../bugs.queries';
import { BugQuery, BugQueryVariables } from '../../../__generated__/BugQuery';

export const useBug = (id: number) => {
    return useQuery<BugQuery, BugQueryVariables>(BUG, { variables: { id } });
}

