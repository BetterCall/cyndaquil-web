import { useLazyQuery, useQuery } from "@apollo/client";
import { REFERENCES } from '../references.queries';
import {
    ReferencesQuery,
    ReferencesQueryVariables
} from '../../../__generated__/ReferencesQuery';

export const useReferences = (variables: ReferencesQueryVariables) => {
    return useQuery<ReferencesQuery, ReferencesQueryVariables>(REFERENCES, { variables });
}

export const useLazyReferences = () => {
    return useLazyQuery<ReferencesQuery, ReferencesQueryVariables>(REFERENCES);
}