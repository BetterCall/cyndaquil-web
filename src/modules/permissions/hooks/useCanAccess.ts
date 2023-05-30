import { useQuery } from "@apollo/client";
import { CAN_ACCESS } from '../permissions.queries';
import { CanAccessQuery, CanAccessQueryVariables } from "../../../__generated__/CanAccessQuery";

export const useCanAccess = (action: string) => {
    return useQuery<CanAccessQuery, CanAccessQueryVariables>(CAN_ACCESS, { variables: { action }, fetchPolicy: 'network-only' })
}
