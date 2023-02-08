/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResolveDemandInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ResolveDemandMutation
// ====================================================

export interface ResolveDemandMutation_resolveDemand {
  __typename: "UpdateDemandOutput";
  ok: boolean | null;
  error: string | null;
}

export interface ResolveDemandMutation {
  resolveDemand: ResolveDemandMutation_resolveDemand;
}

export interface ResolveDemandMutationVariables {
  id: number;
  input: ResolveDemandInput;
}
