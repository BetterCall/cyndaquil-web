/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UploadCategoryQuery
// ====================================================

export interface UploadCategoryQuery_uploadCategory_result {
  __typename: "UploadCategory";
  id: number;
  name: string;
}

export interface UploadCategoryQuery_uploadCategory {
  __typename: "UploadCategoryOutput";
  ok: boolean | null;
  error: string | null;
  result: UploadCategoryQuery_uploadCategory_result | null;
}

export interface UploadCategoryQuery {
  uploadCategory: UploadCategoryQuery_uploadCategory;
}

export interface UploadCategoryQueryVariables {
  id: number;
}
