import { useLazyQuery, useQuery } from "@apollo/client";
import { TraductionsQuery, TraductionsQueryVariables } from "../../../__generated__/TraductionsQuery";
import { TRADUCTIONS } from '../traductions.queries';

export const useTraductions = (variables: TraductionsQueryVariables) => {
    return useQuery<TraductionsQuery, TraductionsQueryVariables>(TRADUCTIONS, { variables });
}

export const useLazyTraductions = () => {
    return useLazyQuery<
        TraductionsQuery,
        TraductionsQueryVariables
    >(TRADUCTIONS);
}