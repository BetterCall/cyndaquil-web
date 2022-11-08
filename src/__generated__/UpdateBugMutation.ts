/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBugInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBugMutation
// ====================================================

export interface UpdateBugMutation_updateBug {
  __typename: "UpdateBugOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateBugMutation {
  updateBug: UpdateBugMutation_updateBug;
}

export interface UpdateBugMutationVariables {
  id: number;
  input: UpdateBugInput;
}
