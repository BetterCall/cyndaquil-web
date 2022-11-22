/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTaxeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTaxeMutation
// ====================================================

export interface UpdateTaxeMutation_updateTaxe {
  __typename: "UpdateTaxeOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateTaxeMutation {
  updateTaxe: UpdateTaxeMutation_updateTaxe;
}

export interface UpdateTaxeMutationVariables {
  id: number;
  input: UpdateTaxeInput;
}
