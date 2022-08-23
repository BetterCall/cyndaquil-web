/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteContactMutation
// ====================================================

export interface DeleteContactMutation_deleteContact {
  __typename: "DeleteContactOutput";
  ok: boolean;
  error: string | null;
}

export interface DeleteContactMutation {
  deleteContact: DeleteContactMutation_deleteContact;
}

export interface DeleteContactMutationVariables {
  id: number;
}
