/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEntranceMutation
// ====================================================

export interface DeleteEntranceMutation_deleteEntrance {
  __typename: "DeleteEntranceOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface DeleteEntranceMutation {
  deleteEntrance: DeleteEntranceMutation_deleteEntrance;
}

export interface DeleteEntranceMutationVariables {
  id: number;
}
