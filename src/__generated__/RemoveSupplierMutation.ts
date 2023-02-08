/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveSupplierMutation
// ====================================================

export interface RemoveSupplierMutation_removeSupplier {
  __typename: "RemoveSupplierOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveSupplierMutation {
  removeSupplier: RemoveSupplierMutation_removeSupplier;
}

export interface RemoveSupplierMutationVariables {
  id: number;
}
