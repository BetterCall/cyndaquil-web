/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTransferInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTransferMutation
// ====================================================

export interface UpdateTransferMutation_updateTransfer {
  __typename: "UpdateTransferOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateTransferMutation {
  updateTransfer: UpdateTransferMutation_updateTransfer;
}

export interface UpdateTransferMutationVariables {
  id: number;
  input: UpdateTransferInput;
}
