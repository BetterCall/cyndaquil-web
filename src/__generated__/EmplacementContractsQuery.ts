/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContractStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: EmplacementContractsQuery
// ====================================================

export interface EmplacementContractsQuery_emplacementContracts_results_contract {
  __typename: "Contract";
  id: number;
  name: string;
  status: ContractStatus;
}

export interface EmplacementContractsQuery_emplacementContracts_results {
  __typename: "ContractEmplacement";
  id: number;
  contract: EmplacementContractsQuery_emplacementContracts_results_contract;
}

export interface EmplacementContractsQuery_emplacementContracts {
  __typename: "EmplacementContractsOutput";
  ok: boolean;
  error: string | null;
  results: EmplacementContractsQuery_emplacementContracts_results[] | null;
}

export interface EmplacementContractsQuery {
  emplacementContracts: EmplacementContractsQuery_emplacementContracts;
}

export interface EmplacementContractsQueryVariables {
  emplacementId: number;
}
