/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferencesFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReferencesQuery
// ====================================================

export interface ReferencesQuery_references_results_brand {
  __typename: "Brand";
  id: number;
  name: string;
}

export interface ReferencesQuery_references_results {
  __typename: "Reference";
  id: number;
  name: string;
  brandId: number | null;
  brand: ReferencesQuery_references_results_brand | null;
}

export interface ReferencesQuery_references {
  __typename: "ReferencesOutput";
  hasMore: boolean | null;
  results: ReferencesQuery_references_results[] | null;
}

export interface ReferencesQuery {
  references: ReferencesQuery_references;
}

export interface ReferencesQueryVariables {
  limit: number;
  offset: number;
  where: ReferencesFiltersInput;
}
