/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCustomerInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCustomerMutation
// ====================================================

export interface UpdateCustomerMutation_updateCustomer {
  __typename: "UpdateCustomerOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateCustomerMutation {
  updateCustomer: UpdateCustomerMutation_updateCustomer;
}

export interface UpdateCustomerMutationVariables {
  id: number;
  input: UpdateCustomerInput;
}
