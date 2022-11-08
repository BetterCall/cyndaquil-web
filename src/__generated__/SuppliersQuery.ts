/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SuppliersFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: SuppliersQuery
// ====================================================

export interface SuppliersQuery_suppliers_results {
  __typename: "Supplier";
  id: number;
  name: string;
  city: string;
  postal: string;
}

export interface SuppliersQuery_suppliers {
  __typename: "SuppliersOutput";
  hasMore: boolean | null;
  results: SuppliersQuery_suppliers_results[] | null;
}

export interface SuppliersQuery {
  suppliers: SuppliersQuery_suppliers;
}

export interface SuppliersQueryVariables {
  limit: number;
  offset: number;
  where: SuppliersFiltersInput;
}
