import { useLazyQuery, useQuery } from "@apollo/client";
import { USERS } from '../user.queries';
import { UsersQuery, UsersQueryVariables } from '../../../__generated__/UsersQuery';

export const useUsers = (variables: UsersQueryVariables) => {
    return useQuery<UsersQuery, UsersQueryVariables>(USERS, { variables });
}

export const useLazyUsers = () => {
    return useLazyQuery<UsersQuery, UsersQueryVariables>(USERS);
}