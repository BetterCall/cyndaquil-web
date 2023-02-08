/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateDemandInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDemandMutation
// ====================================================

export interface UpdateDemandMutation_updateDemand {
  __typename: "UpdateDemandOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateDemandMutation {
  updateDemand: UpdateDemandMutation_updateDemand;
}

export interface UpdateDemandMutationVariables {
  id: number;
  input: UpdateDemandInput;
}
