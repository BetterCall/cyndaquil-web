/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditContactInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditContactMutation
// ====================================================

export interface EditContactMutation_editContact {
  __typename: "EditContactOutput";
  ok: boolean;
  error: string | null;
}

export interface EditContactMutation {
  editContact: EditContactMutation_editContact;
}

export interface EditContactMutationVariables {
  id: number;
  input: EditContactInput;
}
