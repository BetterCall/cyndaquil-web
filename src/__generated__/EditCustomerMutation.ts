/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCustomerInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditCustomerMutation
// ====================================================

export interface EditCustomerMutation_editCustomer {
  __typename: "EditCustomerOutput";
  ok: boolean;
  error: string | null;
}

export interface EditCustomerMutation {
  editCustomer: EditCustomerMutation_editCustomer;
}

export interface EditCustomerMutationVariables {
  id: number;
  input: EditCustomerInput;
}
