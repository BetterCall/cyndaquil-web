/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateContactInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateContactMutation
// ====================================================

export interface CreateContactMutation_createContact {
  __typename: "CreateContactOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateContactMutation {
  createContact: CreateContactMutation_createContact;
}

export interface CreateContactMutationVariables {
  input: CreateContactInput;
}
