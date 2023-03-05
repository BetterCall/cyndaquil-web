/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveControlMutation
// ====================================================

export interface RemoveControlMutation_removeControl {
  __typename: "RemoveControlOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveControlMutation {
  removeControl: RemoveControlMutation_removeControl;
}

export interface RemoveControlMutationVariables {
  id: number;
}
