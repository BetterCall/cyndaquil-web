/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUploadCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUploadCategoryMutation
// ====================================================

export interface CreateUploadCategoryMutation_createUploadCategory {
  __typename: "CreateUploadCategoryOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateUploadCategoryMutation {
  createUploadCategory: CreateUploadCategoryMutation_createUploadCategory;
}

export interface CreateUploadCategoryMutationVariables {
  input: CreateUploadCategoryInput;
}
