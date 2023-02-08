/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TransferQuery
// ====================================================

export interface TransferQuery_transfer_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface TransferQuery_transfer_result_recordedBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface TransferQuery_transfer_result {
  __typename: "Transfer";
  id: number;
  iban: string;
  amount: number;
  comment: string | null;
  createdAt: any;
  customerId: number | null;
  customer: TransferQuery_transfer_result_customer | null;
  recordedById: number | null;
  recordedBy: TransferQuery_transfer_result_recordedBy | null;
}

export interface TransferQuery_transfer {
  __typename: "TransferOutput";
  ok: boolean | null;
  error: string | null;
  result: TransferQuery_transfer_result | null;
}

export interface TransferQuery {
  transfer: TransferQuery_transfer;
}

export interface TransferQueryVariables {
  id: number;
}
