/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveSupplierMutation
// ====================================================

export interface RemoveSupplierMutation_removeCall {
  __typename: "RemoveCallOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveSupplierMutation {
  removeCall: RemoveSupplierMutation_removeCall;
}

export interface RemoveSupplierMutationVariables {
  id: number;
}
