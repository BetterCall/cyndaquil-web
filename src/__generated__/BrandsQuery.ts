/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrandsFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: BrandsQuery
// ====================================================

export interface BrandsQuery_brands_results {
  __typename: "Brand";
  id: number;
  name: string;
  referencesCount: number;
}

export interface BrandsQuery_brands {
  __typename: "BrandsOutput";
  hasMore: boolean | null;
  results: BrandsQuery_brands_results[] | null;
}

export interface BrandsQuery {
  brands: BrandsQuery_brands;
}

export interface BrandsQueryVariables {
  limit: number;
  offset: number;
  where: BrandsFiltersInput;
}
