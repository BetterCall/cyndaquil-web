/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEmplacementInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEmplacementMutation
// ====================================================

export interface CreateEmplacementMutation_createEmplacement {
  __typename: "CreateEmplacementOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateEmplacementMutation {
  createEmplacement: CreateEmplacementMutation_createEmplacement;
}

export interface CreateEmplacementMutationVariables {
  input: CreateEmplacementInput;
}
