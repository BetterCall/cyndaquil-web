import { useLazyQuery, useQuery } from "@apollo/client";
import { SITES } from '../sites.queries';
import { SitesQuery, SitesQueryVariables } from '../../../__generated__/SitesQuery';

export const useSites = (variables: SitesQueryVariables) => {
    return useQuery<SitesQuery, SitesQueryVariables>(SITES, { variables });
}

export const useLazySites = () => {
    return useLazyQuery<
        SitesQuery,
        SitesQueryVariables
    >(SITES);
}