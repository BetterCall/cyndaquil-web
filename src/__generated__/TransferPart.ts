/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TransferPart
// ====================================================

export interface TransferPart_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface TransferPart_recordedBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface TransferPart {
  __typename: "Transfer";
  id: number;
  iban: string;
  amount: number;
  comment: string | null;
  createdAt: any;
  customerId: number | null;
  customer: TransferPart_customer | null;
  recordedById: number | null;
  recordedBy: TransferPart_recordedBy | null;
}
