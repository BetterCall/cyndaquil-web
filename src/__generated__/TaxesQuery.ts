/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TaxesQuery
// ====================================================

export interface TaxesQuery_taxes_results {
  __typename: "Taxe";
  id: number;
  name: string;
  value: number;
}

export interface TaxesQuery_taxes {
  __typename: "TaxesOutput";
  hasMore: boolean | null;
  results: TaxesQuery_taxes_results[] | null;
}

export interface TaxesQuery {
  taxes: TaxesQuery_taxes;
}
