/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContractFiltersInput, ContractStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ContractsQuery
// ====================================================

export interface ContractsQuery_contracts_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface ContractsQuery_contracts_results_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface ContractsQuery_contracts_results_madeBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface ContractsQuery_contracts_results {
  __typename: "Contract";
  id: number;
  name: string;
  status: ContractStatus;
  customer: ContractsQuery_contracts_results_customer;
  site: ContractsQuery_contracts_results_site;
  madeBy: ContractsQuery_contracts_results_madeBy;
}

export interface ContractsQuery_contracts {
  __typename: "ContractsOutput";
  hasMore: boolean | null;
  results: ContractsQuery_contracts_results[] | null;
}

export interface ContractsQuery {
  contracts: ContractsQuery_contracts;
}

export interface ContractsQueryVariables {
  limit: number;
  offset: number;
  where: ContractFiltersInput;
}
