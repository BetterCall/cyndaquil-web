/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveCallMutation
// ====================================================

export interface RemoveCallMutation_removeCall {
  __typename: "RemoveCallOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveCallMutation {
  removeCall: RemoveCallMutation_removeCall;
}

export interface RemoveCallMutationVariables {
  id: number;
}
