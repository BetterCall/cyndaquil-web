/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTaxeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTaxeMutation
// ====================================================

export interface CreateTaxeMutation_createTaxe {
  __typename: "CreateTaxeOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateTaxeMutation {
  createTaxe: CreateTaxeMutation_createTaxe;
}

export interface CreateTaxeMutationVariables {
  input: CreateTaxeInput;
}
