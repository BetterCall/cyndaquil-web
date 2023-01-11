import { useQuery } from "@apollo/client";
import { EMPLACEMENT } from '../emplacements.queries';
import { EmplacementQuery, EmplacementQueryVariables } from '../../../__generated__/EmplacementQuery';

export const useEmplacement = (id: number) => {
    return useQuery<EmplacementQuery, EmplacementQueryVariables>(EMPLACEMENT, { variables: { id } });
}

