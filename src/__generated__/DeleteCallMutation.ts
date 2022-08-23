/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCallMutation
// ====================================================

export interface DeleteCallMutation_deleteCall {
  __typename: "DeleteCallOutput";
  ok: boolean;
  error: string | null;
}

export interface DeleteCallMutation {
  deleteCall: DeleteCallMutation_deleteCall;
}

export interface DeleteCallMutationVariables {
  id: number;
}
