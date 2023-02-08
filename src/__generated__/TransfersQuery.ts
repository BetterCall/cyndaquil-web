/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransferFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: TransfersQuery
// ====================================================

export interface TransfersQuery_transfers_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface TransfersQuery_transfers_results_recordedBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface TransfersQuery_transfers_results {
  __typename: "Transfer";
  id: number;
  iban: string;
  amount: number;
  comment: string | null;
  createdAt: any;
  customerId: number | null;
  customer: TransfersQuery_transfers_results_customer | null;
  recordedById: number | null;
  recordedBy: TransfersQuery_transfers_results_recordedBy | null;
}

export interface TransfersQuery_transfers {
  __typename: "TransfersOutput";
  hasMore: boolean | null;
  results: TransfersQuery_transfers_results[] | null;
}

export interface TransfersQuery {
  transfers: TransfersQuery_transfers;
}

export interface TransfersQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: TransferFiltersInput;
}
