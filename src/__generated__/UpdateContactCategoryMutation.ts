/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateContactCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateContactCategoryMutation
// ====================================================

export interface UpdateContactCategoryMutation_updateContactCategory {
  __typename: "UpdateContactCategoryOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateContactCategoryMutation {
  updateContactCategory: UpdateContactCategoryMutation_updateContactCategory;
}

export interface UpdateContactCategoryMutationVariables {
  id: number;
  input: UpdateContactCategoryInput;
}
