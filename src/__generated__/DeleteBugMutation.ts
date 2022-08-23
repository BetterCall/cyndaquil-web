/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteBugMutation
// ====================================================

export interface DeleteBugMutation_deleteBug {
  __typename: "DeleteBugOutput";
  ok: boolean;
  error: string | null;
}

export interface DeleteBugMutation {
  deleteBug: DeleteBugMutation_deleteBug;
}

export interface DeleteBugMutationVariables {
  id: number;
}
