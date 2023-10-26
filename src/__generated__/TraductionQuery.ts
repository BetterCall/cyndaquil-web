/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TraductionQuery
// ====================================================

export interface TraductionQuery_traduction_result {
  __typename: "Traduction";
  id: number;
  key: string;
  value: string;
}

export interface TraductionQuery_traduction {
  __typename: "TraductionOutput";
  ok: boolean | null;
  error: string | null;
  result: TraductionQuery_traduction_result | null;
}

export interface TraductionQuery {
  traduction: TraductionQuery_traduction;
}

export interface TraductionQueryVariables {
  id?: number | null;
  key?: string | null;
}
