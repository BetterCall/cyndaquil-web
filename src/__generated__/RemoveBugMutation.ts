/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveBugMutation
// ====================================================

export interface RemoveBugMutation_removeBug {
  __typename: "RemoveBugOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveBugMutation {
  removeBug: RemoveBugMutation_removeBug;
}

export interface RemoveBugMutationVariables {
  id: number;
}
