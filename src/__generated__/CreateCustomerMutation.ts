/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCustomerInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCustomerMutation
// ====================================================

export interface CreateCustomerMutation_createCustomer {
  __typename: "CreateCustomerOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateCustomerMutation {
  createCustomer: CreateCustomerMutation_createCustomer;
}

export interface CreateCustomerMutationVariables {
  input: CreateCustomerInput;
}
