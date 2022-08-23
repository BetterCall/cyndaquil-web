/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditBugInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditBugMutation
// ====================================================

export interface EditBugMutation_editBug {
  __typename: "EditBugOutput";
  ok: boolean;
  error: string | null;
}

export interface EditBugMutation {
  editBug: EditBugMutation_editBug;
}

export interface EditBugMutationVariables {
  id: number;
  input: EditBugInput;
}
