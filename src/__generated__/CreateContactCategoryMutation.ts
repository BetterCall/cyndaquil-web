/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateContactCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateContactCategoryMutation
// ====================================================

export interface CreateContactCategoryMutation_createContactCategory {
  __typename: "CreateContactCategoryOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateContactCategoryMutation {
  createContactCategory: CreateContactCategoryMutation_createContactCategory;
}

export interface CreateContactCategoryMutationVariables {
  input: CreateContactCategoryInput;
}
