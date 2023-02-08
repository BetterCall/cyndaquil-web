/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePaymentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePaymentMutation
// ====================================================

export interface UpdatePaymentMutation_updatePayment {
  __typename: "UpdatePaymentOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdatePaymentMutation {
  updatePayment: UpdatePaymentMutation_updatePayment;
}

export interface UpdatePaymentMutationVariables {
  id: number;
  input: UpdatePaymentInput;
}
