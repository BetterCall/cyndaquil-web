import { useLazyQuery, useQuery } from "@apollo/client";
import { USER } from '../user.queries';
import { UserQuery, UserQueryVariables } from '../../../__generated__/UserQuery';

export const useUser = (id: number) => {
    return useQuery<UserQuery, UserQueryVariables>(USER, { variables: { id } });
}

export const useLazyUser = () => {
    return useLazyQuery<UserQuery, UserQueryVariables>(USER);
}