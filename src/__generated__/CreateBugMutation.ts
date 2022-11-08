/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBugInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateBugMutation
// ====================================================

export interface CreateBugMutation_createBug {
  __typename: "CreateBugOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateBugMutation {
  createBug: CreateBugMutation_createBug;
}

export interface CreateBugMutationVariables {
  input: CreateBugInput;
}
