import React from 'react'
import { useLazyQuery, useQuery } from "@apollo/client";
import { USER } from '../queries/user.queries';
import { UserQuery, UserQueryVariables } from '../__generated__/UserQuery';


export const useUser = () => {
    return useQuery<UserQuery, UserQueryVariables>(USER);
}

export const useLazyUser = () => {
    return useLazyQuery<
        UserQuery,
        UserQueryVariables
    >(USER);
}