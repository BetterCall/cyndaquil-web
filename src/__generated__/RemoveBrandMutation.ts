/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveBrandMutation
// ====================================================

export interface RemoveBrandMutation_removeBrand {
  __typename: "RemoveBrandOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveBrandMutation {
  removeBrand: RemoveBrandMutation_removeBrand;
}

export interface RemoveBrandMutationVariables {
  id: number;
}
