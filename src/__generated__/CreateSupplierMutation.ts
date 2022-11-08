/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSupplierInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSupplierMutation
// ====================================================

export interface CreateSupplierMutation_createSupplier {
  __typename: "CreateSupplierOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateSupplierMutation {
  createSupplier: CreateSupplierMutation_createSupplier;
}

export interface CreateSupplierMutationVariables {
  input: CreateSupplierInput;
}
