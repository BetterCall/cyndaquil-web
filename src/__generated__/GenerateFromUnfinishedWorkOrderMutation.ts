/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GenerateFromUnfinishedWorkOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GenerateFromUnfinishedWorkOrderMutation
// ====================================================

export interface GenerateFromUnfinishedWorkOrderMutation_generateFromUnfinishedWorkOrder {
  __typename: "GenerateFromUnfinishedWorkOrderOutput";
  id: number | null;
  ok: boolean | null;
  error: string | null;
}

export interface GenerateFromUnfinishedWorkOrderMutation {
  generateFromUnfinishedWorkOrder: GenerateFromUnfinishedWorkOrderMutation_generateFromUnfinishedWorkOrder;
}

export interface GenerateFromUnfinishedWorkOrderMutationVariables {
  input: GenerateFromUnfinishedWorkOrderInput;
}
