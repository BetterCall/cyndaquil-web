import { useQuery } from "@apollo/client";
import { TRADUCTION } from '../traductions.queries';
import { TraductionQuery, TraductionQueryVariables } from '../../../__generated__/TraductionQuery';

export const useTraductionById = (id: number) => {
    return useQuery<TraductionQuery, TraductionQueryVariables>(TRADUCTION, { variables: { id } });
}


export const useTraductionByKey = (key: string) => {
    return useQuery<TraductionQuery, TraductionQueryVariables>(TRADUCTION, { variables: { key } });
}

