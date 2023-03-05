/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateControlInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateControlMutation
// ====================================================

export interface CreateControlMutation_createControl {
  __typename: "CreateControlOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateControlMutation {
  createControl: CreateControlMutation_createControl;
}

export interface CreateControlMutationVariables {
  input: CreateControlInput;
}
