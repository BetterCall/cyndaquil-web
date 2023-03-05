/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContractRowEmplacementFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ContractRowEmplacementsQuery
// ====================================================

export interface ContractRowEmplacementsQuery_contractRowEmplacements_results_emplacement {
  __typename: "Emplacement";
  id: number;
  building: string;
  entrance: string | null;
  floor: number;
}

export interface ContractRowEmplacementsQuery_contractRowEmplacements_results_contractRow_contract {
  __typename: "Contract";
  id: number;
}

export interface ContractRowEmplacementsQuery_contractRowEmplacements_results_contractRow {
  __typename: "ContractRow";
  id: number;
  contractId: number;
  contract: ContractRowEmplacementsQuery_contractRowEmplacements_results_contractRow_contract;
}

export interface ContractRowEmplacementsQuery_contractRowEmplacements_results {
  __typename: "ContractRowToEmplacement";
  id: number;
  emplacementId: number | null;
  emplacement: ContractRowEmplacementsQuery_contractRowEmplacements_results_emplacement | null;
  contractRowId: number | null;
  contractRow: ContractRowEmplacementsQuery_contractRowEmplacements_results_contractRow | null;
}

export interface ContractRowEmplacementsQuery_contractRowEmplacements {
  __typename: "ContractRowToEmplacementsOutput";
  ok: boolean | null;
  error: string | null;
  results: ContractRowEmplacementsQuery_contractRowEmplacements_results[] | null;
}

export interface ContractRowEmplacementsQuery {
  contractRowEmplacements: ContractRowEmplacementsQuery_contractRowEmplacements;
}

export interface ContractRowEmplacementsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: ContractRowEmplacementFiltersInput;
}
