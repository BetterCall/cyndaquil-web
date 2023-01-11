import { useLazyQuery, useQuery } from "@apollo/client";
import { CONTRACTS } from '../contracts.queries';
import { ContractsQuery, ContractsQueryVariables } from "../../../__generated__/ContractsQuery";

export const useContracts = (variables: ContractsQueryVariables) => {
    return useQuery<ContractsQuery, ContractsQueryVariables>(CONTRACTS, { variables });
}

export const useLazyContracts = () => {
    return useLazyQuery<
        ContractsQuery,
        ContractsQueryVariables
    >(CONTRACTS);
}