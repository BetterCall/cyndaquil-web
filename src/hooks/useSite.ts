import { useLazyQuery, useQuery } from "@apollo/client";
import { SITE } from "../queries/sites.queries";
import { SiteQuery, SiteQueryVariables } from "../__generated__/SiteQuery";


export const useSite = (id: number) => {
    return useQuery<
        SiteQuery,
        SiteQueryVariables
    >(SITE, {
        variables: {
            id,
        },
    });
}


export const useLazySite = () => {
    return useLazyQuery<
        SiteQuery,
        SiteQueryVariables
    >(SITE);
}