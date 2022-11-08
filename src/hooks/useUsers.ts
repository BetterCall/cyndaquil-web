import React from 'react'
import { useLazyQuery, useQuery } from "@apollo/client";
import { USERS } from '../queries/user.queries';
import { UsersQuery, UsersQueryVariables } from '../__generated__/UsersQuery';


export const useUsers = (where = {}) => {
    return useQuery<UsersQuery, UsersQueryVariables>(USERS, { variables: { where } });
}


export const useLazyUsers = () => {
    return useLazyQuery<
        UsersQuery,
        UsersQueryVariables
    >(USERS);
}