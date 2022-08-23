/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCustomerCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCustomerCategoryMutation
// ====================================================

export interface CreateCustomerCategoryMutation_createCustomerCategory {
  __typename: "CreateCustomerCategoryOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface CreateCustomerCategoryMutation {
  createCustomerCategory: CreateCustomerCategoryMutation_createCustomerCategory;
}

export interface CreateCustomerCategoryMutationVariables {
  input: CreateCustomerCategoryInput;
}
