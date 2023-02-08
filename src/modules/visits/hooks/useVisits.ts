import { useLazyQuery, useQuery } from "@apollo/client";
import { VISITS } from '../visits.queries';
import { VisitsQuery, VisitsQueryVariables } from '../../../__generated__/VisitsQuery';

export const useVisits = (variables: VisitsQueryVariables, skip = false) => {
    return useQuery<VisitsQuery, VisitsQueryVariables>(VISITS, { variables, skip });
}

export const useLazyVisits = () => {
    return useLazyQuery<VisitsQuery, VisitsQueryVariables>(VISITS);
}