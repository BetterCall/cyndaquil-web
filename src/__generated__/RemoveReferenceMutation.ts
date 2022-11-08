/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveReferenceMutation
// ====================================================

export interface RemoveReferenceMutation_removeCall {
  __typename: "RemoveCallOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveReferenceMutation {
  removeCall: RemoveReferenceMutation_removeCall;
}

export interface RemoveReferenceMutationVariables {
  id: number;
}
