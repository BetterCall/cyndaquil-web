/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceFiltersInput, InvoiceStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: InvoicesQuery
// ====================================================

export interface InvoicesQuery_invoices_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface InvoicesQuery_invoices_results_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface InvoicesQuery_invoices_results {
  __typename: "Invoice";
  id: number;
  status: InvoiceStatus;
  customer: InvoicesQuery_invoices_results_customer | null;
  site: InvoicesQuery_invoices_results_site | null;
}

export interface InvoicesQuery_invoices {
  __typename: "InvoicesOutput";
  hasMore: boolean | null;
  results: InvoicesQuery_invoices_results[] | null;
}

export interface InvoicesQuery {
  invoices: InvoicesQuery_invoices;
}

export interface InvoicesQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: InvoiceFiltersInput;
}
