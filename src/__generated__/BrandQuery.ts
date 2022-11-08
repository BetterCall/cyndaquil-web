/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BrandQuery
// ====================================================

export interface BrandQuery_brand_result {
  __typename: "Brand";
  id: number;
  name: string;
  referencesCount: number;
}

export interface BrandQuery_brand {
  __typename: "BrandOutput";
  ok: boolean | null;
  error: string | null;
  result: BrandQuery_brand_result | null;
}

export interface BrandQuery {
  brand: BrandQuery_brand;
}

export interface BrandQueryVariables {
  id: number;
}
