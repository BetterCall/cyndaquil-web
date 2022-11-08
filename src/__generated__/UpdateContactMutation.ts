/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateContactInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateContactMutation
// ====================================================

export interface UpdateContactMutation_updateContact {
  __typename: "UpdateContactOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateContactMutation {
  updateContact: UpdateContactMutation_updateContact;
}

export interface UpdateContactMutationVariables {
  id: number;
  input: UpdateContactInput;
}
