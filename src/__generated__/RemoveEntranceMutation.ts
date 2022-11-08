/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveEntranceMutation
// ====================================================

export interface RemoveEntranceMutation_removeEntrance {
  __typename: "RemoveEntranceOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface RemoveEntranceMutation {
  removeEntrance: RemoveEntranceMutation_removeEntrance;
}

export interface RemoveEntranceMutationVariables {
  id: number;
}
