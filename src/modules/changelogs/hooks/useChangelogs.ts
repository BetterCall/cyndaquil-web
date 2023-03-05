import { useLazyQuery, useQuery } from "@apollo/client";
import { CHANGELOGS } from '../changelogs.queries';
import { ChangelogsQuery, ChangelogsQueryVariables } from '../../../__generated__/ChangelogsQuery';

export const useChangelogs = (variables: ChangelogsQueryVariables) => {
    return useQuery<ChangelogsQuery, ChangelogsQueryVariables>(CHANGELOGS, { variables });
}

export const useLazyChangelogs = () => {
    return useLazyQuery<
        ChangelogsQuery,
        ChangelogsQueryVariables
    >(CHANGELOGS);
}