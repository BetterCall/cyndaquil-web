/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DuplicateEntraceMutation
// ====================================================

export interface DuplicateEntraceMutation_duplicateEntrance {
  __typename: "DuplicateEntranceOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface DuplicateEntraceMutation {
  duplicateEntrance: DuplicateEntraceMutation_duplicateEntrance;
}

export interface DuplicateEntraceMutationVariables {
  entranceId: number;
}
