/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TaxeQuery
// ====================================================

export interface TaxeQuery_taxe_result {
  __typename: "Taxe";
  id: number;
  name: string;
  value: number;
}

export interface TaxeQuery_taxe {
  __typename: "TaxeOutput";
  ok: boolean | null;
  error: string | null;
  result: TaxeQuery_taxe_result | null;
}

export interface TaxeQuery {
  taxe: TaxeQuery_taxe;
}

export interface TaxeQueryVariables {
  id: number;
}
