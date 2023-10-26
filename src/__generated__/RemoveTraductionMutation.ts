/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveTraductionMutation
// ====================================================

export interface RemoveTraductionMutation_removeTraduction {
  __typename: "RemoveTraductionOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveTraductionMutation {
  removeTraduction: RemoveTraductionMutation_removeTraduction;
}

export interface RemoveTraductionMutationVariables {
  id: number;
}
