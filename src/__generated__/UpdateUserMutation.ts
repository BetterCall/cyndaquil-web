/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserMutation
// ====================================================

export interface UpdateUserMutation_updateUser {
  __typename: "UpdateUserOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateUserMutation {
  updateUser: UpdateUserMutation_updateUser;
}

export interface UpdateUserMutationVariables {
  id: number;
  input: UpdateUserInput;
}
