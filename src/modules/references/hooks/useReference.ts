import { useQuery, useLazyQuery } from "@apollo/client";
import { REFERENCE } from '../references.queries';
import { ReferenceQuery, ReferenceQueryVariables } from '../../../__generated__/ReferenceQuery';

export const useReference = (id: number) => {
    return useQuery<ReferenceQuery, ReferenceQueryVariables>(REFERENCE, { variables: { id } });
}

export const useLazyReference = () => {
    return useLazyQuery<ReferenceQuery, ReferenceQueryVariables>(REFERENCE);
}
