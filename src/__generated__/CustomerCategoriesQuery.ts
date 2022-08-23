/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerCategoriesQuery
// ====================================================

export interface CustomerCategoriesQuery_customerCategories_results {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface CustomerCategoriesQuery_customerCategories {
  __typename: "CustomerCategoriesOutput";
  results: CustomerCategoriesQuery_customerCategories_results[] | null;
}

export interface CustomerCategoriesQuery {
  customerCategories: CustomerCategoriesQuery_customerCategories;
}
