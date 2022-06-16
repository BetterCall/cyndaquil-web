/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditUserMutation
// ====================================================

export interface EditUserMutation_editUser {
  __typename: "EditUserOutput";
  ok: boolean;
  error: string | null;
}

export interface EditUserMutation {
  editUser: EditUserMutation_editUser;
}

export interface EditUserMutationVariables {
  userId: number;
  input: EditUserInput;
}
