/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateControlInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateControlMutation
// ====================================================

export interface UpdateControlMutation_updateControl {
  __typename: "UpdateControlOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateControlMutation {
  updateControl: UpdateControlMutation_updateControl;
}

export interface UpdateControlMutationVariables {
  id: number;
  input: UpdateControlInput;
}
