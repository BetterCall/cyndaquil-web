/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveContactMutation
// ====================================================

export interface RemoveContactMutation_removeContact {
  __typename: "RemoveContactOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveContactMutation {
  removeContact: RemoveContactMutation_removeContact;
}

export interface RemoveContactMutationVariables {
  id: number;
}
