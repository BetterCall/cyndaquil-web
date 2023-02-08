/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContractStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ContractQuery
// ====================================================

export interface ContractQuery_contract_result_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface ContractQuery_contract_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
  email: string | null;
  phone: string;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  lat: number;
  lng: number;
  category: ContractQuery_contract_result_customer_category | null;
}

export interface ContractQuery_contract_result_site {
  __typename: "Site";
  id: number;
  buildingsCount: number;
  entrancesCount: number;
  name: string;
  completed: boolean;
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
}

export interface ContractQuery_contract_result_rows_benefit {
  __typename: "Benefit";
  id: number;
  name: string;
}

export interface ContractQuery_contract_result_rows_emplacements_emplacement {
  __typename: "Emplacement";
  building: string;
  entrance: string | null;
  floor: number;
}

export interface ContractQuery_contract_result_rows_emplacements {
  __typename: "ContractRowToEmplacement";
  id: number;
  emplacement: ContractQuery_contract_result_rows_emplacements_emplacement | null;
}

export interface ContractQuery_contract_result_rows {
  __typename: "ContractRow";
  id: number;
  unitPrice: number;
  quantity: number;
  taxe: number;
  taxPrice: number;
  totalPrice: number;
  benefit: ContractQuery_contract_result_rows_benefit;
  emplacements: ContractQuery_contract_result_rows_emplacements[];
}

export interface ContractQuery_contract_result {
  __typename: "Contract";
  id: number;
  status: ContractStatus;
  equipmentCount: number;
  price: number;
  taxPrice: number;
  customer: ContractQuery_contract_result_customer;
  site: ContractQuery_contract_result_site;
  rows: ContractQuery_contract_result_rows[] | null;
}

export interface ContractQuery_contract {
  __typename: "ContractOutput";
  ok: boolean | null;
  error: string | null;
  result: ContractQuery_contract_result | null;
}

export interface ContractQuery {
  contract: ContractQuery_contract;
}

export interface ContractQueryVariables {
  id: number;
}
