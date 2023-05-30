/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UploadCategoriesQuery
// ====================================================

export interface UploadCategoriesQuery_uploadCategories_results {
  __typename: "UploadCategory";
  id: number;
  name: string;
}

export interface UploadCategoriesQuery_uploadCategories {
  __typename: "UploadCategoriesOutput";
  results: UploadCategoriesQuery_uploadCategories_results[] | null;
}

export interface UploadCategoriesQuery {
  uploadCategories: UploadCategoriesQuery_uploadCategories;
}
