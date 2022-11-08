/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCallInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCallMutation
// ====================================================

export interface CreateCallMutation_createCall {
  __typename: "CreateCallOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateCallMutation {
  createCall: CreateCallMutation_createCall;
}

export interface CreateCallMutationVariables {
  input: CreateCallInput;
}
