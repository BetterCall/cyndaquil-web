/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSiteInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSiteMutation
// ====================================================

export interface UpdateSiteMutation_updateSite_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface UpdateSiteMutation_updateSite_customer {
  __typename: "Customer";
  id: number;
  name: string;
  category: UpdateSiteMutation_updateSite_customer_category | null;
}

export interface UpdateSiteMutation_updateSite {
  __typename: "UpdateSiteOutput";
  ok: boolean | null;
  error: string | null;
  customer: UpdateSiteMutation_updateSite_customer | null;
}

export interface UpdateSiteMutation {
  updateSite: UpdateSiteMutation_updateSite;
}

export interface UpdateSiteMutationVariables {
  id: number;
  input: UpdateSiteInput;
}
