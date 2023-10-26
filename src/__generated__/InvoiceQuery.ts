/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceStatus, InvoiceRowType } from "./globalTypes";

// ====================================================
// GraphQL query operation: InvoiceQuery
// ====================================================

export interface InvoiceQuery_invoice_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
}

export interface InvoiceQuery_invoice_result_site {
  __typename: "Site";
  id: number;
  name: string;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
}

export interface InvoiceQuery_invoice_result_rows {
  __typename: "InvoiceRow";
  benefitId: number;
  equipmentCategoryId: number;
  line: string;
  type: InvoiceRowType;
  unitPrice: number;
  quantity: number;
  taxPercentage: number;
  taxAmount: number;
  totalWithoutTax: number;
  totalWithTax: number;
  discount: number;
}

export interface InvoiceQuery_invoice_result {
  __typename: "Invoice";
  id: number;
  status: InvoiceStatus;
  quantity: number;
  taxAmount: number;
  totalWithoutTax: number;
  totalWithTax: number;
  discount: number;
  amountRemaining: number;
  createdAt: any;
  customerId: number | null;
  customer: InvoiceQuery_invoice_result_customer | null;
  siteId: number | null;
  site: InvoiceQuery_invoice_result_site | null;
  rows: InvoiceQuery_invoice_result_rows[] | null;
}

export interface InvoiceQuery_invoice {
  __typename: "InvoiceOutput";
  ok: boolean | null;
  error: string | null;
  result: InvoiceQuery_invoice_result | null;
}

export interface InvoiceQuery {
  invoice: InvoiceQuery_invoice;
}

export interface InvoiceQueryVariables {
  id: number;
}
