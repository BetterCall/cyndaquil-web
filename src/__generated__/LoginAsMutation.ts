/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginAsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LoginAsMutation
// ====================================================

export interface LoginAsMutation_loginAs {
  __typename: "LoginAsOutput";
  ok: boolean | null;
  error: string | null;
  token: string | null;
}

export interface LoginAsMutation {
  loginAs: LoginAsMutation_loginAs;
}

export interface LoginAsMutationVariables {
  input: LoginAsInput;
}
