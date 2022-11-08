/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSiteInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSiteMutation
// ====================================================

export interface CreateSiteMutation_createSite_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface CreateSiteMutation_createSite_customer {
  __typename: "Customer";
  id: number;
  name: string;
  category: CreateSiteMutation_createSite_customer_category | null;
}

export interface CreateSiteMutation_createSite {
  __typename: "CreateSiteOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
  customer: CreateSiteMutation_createSite_customer | null;
}

export interface CreateSiteMutation {
  createSite: CreateSiteMutation_createSite;
}

export interface CreateSiteMutationVariables {
  input: CreateSiteInput;
}
