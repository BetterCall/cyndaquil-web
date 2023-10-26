/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TraductionsFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: TraductionsQuery
// ====================================================

export interface TraductionsQuery_traductions_results {
  __typename: "Traduction";
  id: number;
  key: string;
  value: string;
}

export interface TraductionsQuery_traductions {
  __typename: "TraductionsOutput";
  results: TraductionsQuery_traductions_results[] | null;
}

export interface TraductionsQuery {
  traductions: TraductionsQuery_traductions;
}

export interface TraductionsQueryVariables {
  where: TraductionsFiltersInput;
}
