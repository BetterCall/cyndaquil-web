/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTraductionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTraductionMutation
// ====================================================

export interface UpdateTraductionMutation_updateTraduction {
  __typename: "UpdateTraductionOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateTraductionMutation {
  updateTraduction: UpdateTraductionMutation_updateTraduction;
}

export interface UpdateTraductionMutationVariables {
  id: number;
  input: UpdateTraductionInput;
}
