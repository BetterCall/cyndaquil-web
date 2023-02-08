/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTransferInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTransferMutation
// ====================================================

export interface CreateTransferMutation_createTransfer {
  __typename: "CreateTransferOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateTransferMutation {
  createTransfer: CreateTransferMutation_createTransfer;
}

export interface CreateTransferMutationVariables {
  input: CreateTransferInput;
}
