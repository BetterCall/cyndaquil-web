/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCallInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditCallMutation
// ====================================================

export interface EditCallMutation_editCall {
  __typename: "EditCallOutput";
  ok: boolean;
  error: string | null;
}

export interface EditCallMutation {
  editCall: EditCallMutation_editCall;
}

export interface EditCallMutationVariables {
  id: number;
  input: EditCallInput;
}
