/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDemandInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDemandMutation
// ====================================================

export interface CreateDemandMutation_createDemand {
  __typename: "CreateDemandOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateDemandMutation {
  createDemand: CreateDemandMutation_createDemand;
}

export interface CreateDemandMutationVariables {
  input: CreateDemandInput;
}
