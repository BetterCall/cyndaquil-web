/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBrandInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateBrandMutation
// ====================================================

export interface CreateBrandMutation_createBrand {
  __typename: "CreateBrandOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateBrandMutation {
  createBrand: CreateBrandMutation_createBrand;
}

export interface CreateBrandMutationVariables {
  input: CreateBrandInput;
}
