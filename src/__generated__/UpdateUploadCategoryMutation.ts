/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUploadCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUploadCategoryMutation
// ====================================================

export interface UpdateUploadCategoryMutation_updateUploadCategory {
  __typename: "UpdateUploadCategoryOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateUploadCategoryMutation {
  updateUploadCategory: UpdateUploadCategoryMutation_updateUploadCategory;
}

export interface UpdateUploadCategoryMutationVariables {
  id: number;
  input: UpdateUploadCategoryInput;
}
