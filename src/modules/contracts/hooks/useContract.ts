import { useQuery } from "@apollo/client";
import { CONTRACT } from '../contracts.queries';
import { ContractQuery, ContractQueryVariables } from '../../../__generated__/ContractQuery';

export const useContract = (id: number) => {
    return useQuery<ContractQuery, ContractQueryVariables>(CONTRACT, { variables: { id } });
}

