/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEmplacementInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEmplacementMutation
// ====================================================

export interface UpdateEmplacementMutation_updateEmplacement {
  __typename: "UpdateEmplacementOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateEmplacementMutation {
  updateEmplacement: UpdateEmplacementMutation_updateEmplacement;
}

export interface UpdateEmplacementMutationVariables {
  id: number;
  input: UpdateEmplacementInput;
}
