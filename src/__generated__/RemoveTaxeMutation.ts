/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveTaxeMutation
// ====================================================

export interface RemoveTaxeMutation_removeTaxe {
  __typename: "RemoveTaxeOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveTaxeMutation {
  removeTaxe: RemoveTaxeMutation_removeTaxe;
}

export interface RemoveTaxeMutationVariables {
  id: number;
}
