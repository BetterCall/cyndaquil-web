/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentFiltersInput, PaymentType } from "./globalTypes";

// ====================================================
// GraphQL query operation: PaymentsQuery
// ====================================================

export interface PaymentsQuery_payments_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface PaymentsQuery_payments_results_invoice_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface PaymentsQuery_payments_results_invoice {
  __typename: "Invoice";
  id: number;
  site: PaymentsQuery_payments_results_invoice_site | null;
}

export interface PaymentsQuery_payments_results_recordedBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface PaymentsQuery_payments_results {
  __typename: "Payment";
  id: number;
  type: PaymentType;
  customerId: number | null;
  customer: PaymentsQuery_payments_results_customer | null;
  invoiceId: number | null;
  invoice: PaymentsQuery_payments_results_invoice | null;
  recordedBy: PaymentsQuery_payments_results_recordedBy | null;
}

export interface PaymentsQuery_payments {
  __typename: "PaymentsOutput";
  hasMore: boolean | null;
  results: PaymentsQuery_payments_results[] | null;
}

export interface PaymentsQuery {
  payments: PaymentsQuery_payments;
}

export interface PaymentsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: PaymentFiltersInput;
}
