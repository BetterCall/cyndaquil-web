import { useLazyQuery, useQuery } from "@apollo/client";
import { CONTRACT_ROW_EMPLACEMENTS } from '../contract-row-emplacements.queries';
import { ContractRowEmplacementsQuery, ContractRowEmplacementsQueryVariables } from '../../../__generated__/ContractRowEmplacementsQuery';

export const useContractRowEmplacements = (variables: ContractRowEmplacementsQueryVariables) => {
    return useQuery<ContractRowEmplacementsQuery, ContractRowEmplacementsQueryVariables>(CONTRACT_ROW_EMPLACEMENTS, { variables });
}

export const useLazyContractRowEmplacements = () => {
    return useLazyQuery<ContractRowEmplacementsQuery, ContractRowEmplacementsQueryVariables>(CONTRACT_ROW_EMPLACEMENTS);
}