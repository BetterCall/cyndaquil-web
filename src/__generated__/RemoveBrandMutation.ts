/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveBrandMutation
// ====================================================

export interface RemoveBrandMutation_removeCall {
  __typename: "RemoveCallOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveBrandMutation {
  removeCall: RemoveBrandMutation_removeCall;
}

export interface RemoveBrandMutationVariables {
  id: number;
}
