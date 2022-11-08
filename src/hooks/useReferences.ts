import { useQuery } from "@apollo/client";
import { REFERENCES } from "../queries/references.queries";
import { ReferencesQuery, ReferencesQueryVariables } from "../__generated__/ReferencesQuery";



export const useReferences = (variables: ReferencesQueryVariables) => {
    return useQuery<ReferencesQuery, ReferencesQueryVariables>(REFERENCES, { variables });
}