/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GenerateFromWorkOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GenerateFromWorkOrderMutation
// ====================================================

export interface GenerateFromWorkOrderMutation_generateFromWorkOrder {
  __typename: "GenerateFromWorkOrderOutput";
  id: number | null;
  ok: boolean | null;
  error: string | null;
}

export interface GenerateFromWorkOrderMutation {
  generateFromWorkOrder: GenerateFromWorkOrderMutation_generateFromWorkOrder;
}

export interface GenerateFromWorkOrderMutationVariables {
  input: GenerateFromWorkOrderInput;
}
