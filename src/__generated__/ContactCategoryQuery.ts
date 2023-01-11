/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContactCategoryQuery
// ====================================================

export interface ContactCategoryQuery_contactCategory_result {
  __typename: "ContactCategory";
  id: number;
  name: string;
}

export interface ContactCategoryQuery_contactCategory {
  __typename: "ContactCategoryOutput";
  ok: boolean | null;
  error: string | null;
  result: ContactCategoryQuery_contactCategory_result | null;
}

export interface ContactCategoryQuery {
  contactCategory: ContactCategoryQuery_contactCategory;
}

export interface ContactCategoryQueryVariables {
  id: number;
}
