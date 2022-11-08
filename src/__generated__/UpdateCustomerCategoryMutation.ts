/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCustomerCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCustomerCategoryMutation
// ====================================================

export interface UpdateCustomerCategoryMutation_updateCustomerCategory {
  __typename: "UpdateCustomerCategoryOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateCustomerCategoryMutation {
  updateCustomerCategory: UpdateCustomerCategoryMutation_updateCustomerCategory;
}

export interface UpdateCustomerCategoryMutationVariables {
  id: number;
  input: UpdateCustomerCategoryInput;
}
