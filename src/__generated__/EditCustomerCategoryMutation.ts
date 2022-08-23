/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCustomerCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditCustomerCategoryMutation
// ====================================================

export interface EditCustomerCategoryMutation_editCustomerCategory {
  __typename: "EditCustomerCategoryOutput";
  ok: boolean;
  error: string | null;
}

export interface EditCustomerCategoryMutation {
  editCustomerCategory: EditCustomerCategoryMutation_editCustomerCategory;
}

export interface EditCustomerCategoryMutationVariables {
  id: number;
  input: EditCustomerCategoryInput;
}
