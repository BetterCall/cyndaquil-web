/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateInvoiceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateInvoiceMutation
// ====================================================

export interface CreateInvoiceMutation_createInvoice {
  __typename: "CreateInvoiceOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateInvoiceMutation {
  createInvoice: CreateInvoiceMutation_createInvoice;
}

export interface CreateInvoiceMutationVariables {
  input: CreateInvoiceInput;
}
