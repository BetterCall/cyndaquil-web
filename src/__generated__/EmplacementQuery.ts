/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EmplacementQuery
// ====================================================

export interface EmplacementQuery_emplacement_result {
  __typename: "Emplacement";
  id: number;
  building: string;
  entrance: string | null;
  floor: number;
}

export interface EmplacementQuery_emplacement {
  __typename: "EmplacementOutput";
  ok: boolean | null;
  error: string | null;
  result: EmplacementQuery_emplacement_result | null;
}

export interface EmplacementQuery {
  emplacement: EmplacementQuery_emplacement;
}

export interface EmplacementQueryVariables {
  id: number;
}
