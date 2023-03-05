import { useQuery } from "@apollo/client";
import { CHANGELOG } from '../changelogs.queries';
import { ChangelogQuery, ChangelogQueryVariables } from '../../../__generated__/ChangelogQuery';

export const useChangelog = (id: number) => {
    return useQuery<ChangelogQuery, ChangelogQueryVariables>(CHANGELOG, { variables: { id } });
}

