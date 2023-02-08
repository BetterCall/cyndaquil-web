/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateInvoiceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateInvoiceMutation
// ====================================================

export interface UpdateInvoiceMutation_updateInvoice {
  __typename: "UpdateInvoiceOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateInvoiceMutation {
  updateInvoice: UpdateInvoiceMutation_updateInvoice;
}

export interface UpdateInvoiceMutationVariables {
  id: number;
  input: UpdateInvoiceInput;
}
