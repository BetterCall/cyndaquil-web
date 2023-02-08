import { useQuery } from "@apollo/client";
import { VISIT } from '../visits.queries';
import { VisitQuery, VisitQueryVariables } from '../../../__generated__/VisitQuery';

export const useVisit = (id: number) => {
    return useQuery<VisitQuery, VisitQueryVariables>(VISIT, { variables: { id } });
}

