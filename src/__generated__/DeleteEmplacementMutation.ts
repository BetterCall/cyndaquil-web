/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEmplacementMutation
// ====================================================

export interface DeleteEmplacementMutation_deleteEmplacement {
  __typename: "DeleteEmplacementOutput";
  ok: boolean;
  error: string | null;
}

export interface DeleteEmplacementMutation {
  deleteEmplacement: DeleteEmplacementMutation_deleteEmplacement;
}

export interface DeleteEmplacementMutationVariables {
  id: number;
}
