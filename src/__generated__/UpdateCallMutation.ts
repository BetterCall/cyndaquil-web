/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCallInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCallMutation
// ====================================================

export interface UpdateCallMutation_updateCall {
  __typename: "UpdateCallOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateCallMutation {
  updateCall: UpdateCallMutation_updateCall;
}

export interface UpdateCallMutationVariables {
  id: number;
  input: UpdateCallInput;
}
