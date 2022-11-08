/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSupplierInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSupplierMutation
// ====================================================

export interface UpdateSupplierMutation_updateSupplier {
  __typename: "UpdateSupplierOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateSupplierMutation {
  updateSupplier: UpdateSupplierMutation_updateSupplier;
}

export interface UpdateSupplierMutationVariables {
  id: number;
  input: UpdateSupplierInput;
}
