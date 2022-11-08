/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBrandInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBrandMutation
// ====================================================

export interface UpdateBrandMutation_updateBrand {
  __typename: "UpdateBrandOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateBrandMutation {
  updateBrand: UpdateBrandMutation_updateBrand;
}

export interface UpdateBrandMutationVariables {
  id: number;
  input: UpdateBrandInput;
}
