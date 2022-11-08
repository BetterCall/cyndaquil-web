/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerCategoryQuery
// ====================================================

export interface CustomerCategoryQuery_customerCategory_result {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface CustomerCategoryQuery_customerCategory {
  __typename: "CustomerCategoryOutput";
  ok: boolean | null;
  error: string | null;
  result: CustomerCategoryQuery_customerCategory_result | null;
}

export interface CustomerCategoryQuery {
  customerCategory: CustomerCategoryQuery_customerCategory;
}

export interface CustomerCategoryQueryVariables {
  id: number;
}
