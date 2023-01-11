/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContactCategoriesQuery
// ====================================================

export interface ContactCategoriesQuery_contactCategories_results {
  __typename: "ContactCategory";
  id: number;
  name: string;
  contactsCount: number;
}

export interface ContactCategoriesQuery_contactCategories {
  __typename: "ContactCategoriesOutput";
  results: ContactCategoriesQuery_contactCategories_results[] | null;
}

export interface ContactCategoriesQuery {
  contactCategories: ContactCategoriesQuery_contactCategories;
}
