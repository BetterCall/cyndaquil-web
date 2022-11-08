/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReferenceQuery
// ====================================================

export interface ReferenceQuery_reference_result {
  __typename: "Reference";
  id: number;
  name: string;
}

export interface ReferenceQuery_reference {
  __typename: "ReferenceOutput";
  ok: boolean | null;
  error: string | null;
  result: ReferenceQuery_reference_result | null;
}

export interface ReferenceQuery {
  reference: ReferenceQuery_reference;
}

export interface ReferenceQueryVariables {
  id: number;
}
