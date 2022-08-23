import React from 'react'
import { useQuery } from "@apollo/client";
import { CALLS } from '../queries/calls.queries';
import { CallsQuery, CallsQueryVariables } from '../__generated__/CallsQuery';


export const useCalls = (variables: CallsQueryVariables) => {
    return useQuery<CallsQuery, CallsQueryVariables>(CALLS, { variables });
}