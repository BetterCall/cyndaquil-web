import { useLazyQuery, useQuery } from "@apollo/client";
import { EMPLACEMENTS } from '../emplacements.queries';
import { EmplacementsQuery, EmplacementsQueryVariables } from '../../../__generated__/EmplacementsQuery';

export const useEmplacements = (variables: EmplacementsQueryVariables) => {
    return useQuery<EmplacementsQuery, EmplacementsQueryVariables>(EMPLACEMENTS, { variables });
}

export const useLazyEmplacements = () => {
    return useLazyQuery<
        EmplacementsQuery,
        EmplacementsQueryVariables
    >(EMPLACEMENTS);
}