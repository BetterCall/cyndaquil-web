/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveEmplacementMutation
// ====================================================

export interface RemoveEmplacementMutation_removeEmplacement {
  __typename: "RemoveEmplacementOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveEmplacementMutation {
  removeEmplacement: RemoveEmplacementMutation_removeEmplacement;
}

export interface RemoveEmplacementMutationVariables {
  id: number;
}
