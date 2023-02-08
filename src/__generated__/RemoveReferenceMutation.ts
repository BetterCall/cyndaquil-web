/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveReferenceMutation
// ====================================================

export interface RemoveReferenceMutation_removeReference {
  __typename: "RemoveReferenceOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveReferenceMutation {
  removeReference: RemoveReferenceMutation_removeReference;
}

export interface RemoveReferenceMutationVariables {
  id: number;
}
