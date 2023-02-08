/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveDemandMutation
// ====================================================

export interface RemoveDemandMutation_removeDemand {
  __typename: "RemoveDemandOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveDemandMutation {
  removeDemand: RemoveDemandMutation_removeDemand;
}

export interface RemoveDemandMutationVariables {
  id: number;
}
