/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditSiteInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditSiteMutation
// ====================================================

export interface EditSiteMutation_editSite_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface EditSiteMutation_editSite_customer {
  __typename: "Customer";
  id: number;
  name: string;
  category: EditSiteMutation_editSite_customer_category | null;
}

export interface EditSiteMutation_editSite {
  __typename: "EditSiteOutput";
  ok: boolean;
  error: string | null;
  customer: EditSiteMutation_editSite_customer | null;
}

export interface EditSiteMutation {
  editSite: EditSiteMutation_editSite;
}

export interface EditSiteMutationVariables {
  id: number;
  input: EditSiteInput;
}
