/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentType } from "./globalTypes";

// ====================================================
// GraphQL query operation: PaymentQuery
// ====================================================

export interface PaymentQuery_payment_result_recordedBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface PaymentQuery_payment_result_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface PaymentQuery_payment_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
  category: PaymentQuery_payment_result_customer_category | null;
}

export interface PaymentQuery_payment_result_invoice_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface PaymentQuery_payment_result_invoice {
  __typename: "Invoice";
  id: number;
  site: PaymentQuery_payment_result_invoice_site | null;
}

export interface PaymentQuery_payment_result {
  __typename: "Payment";
  id: number;
  type: PaymentType;
  recordedBy: PaymentQuery_payment_result_recordedBy | null;
  customer: PaymentQuery_payment_result_customer | null;
  invoice: PaymentQuery_payment_result_invoice | null;
}

export interface PaymentQuery_payment {
  __typename: "PaymentOutput";
  ok: boolean | null;
  error: string | null;
  result: PaymentQuery_payment_result | null;
}

export interface PaymentQuery {
  payment: PaymentQuery_payment;
}

export interface PaymentQueryVariables {
  id: number;
}
