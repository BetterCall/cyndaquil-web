/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateWorkOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateWorkOrderMutation
// ====================================================

export interface CreateWorkOrderMutation_createWorkOrder {
  __typename: "CreateWorkOrderOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface CreateWorkOrderMutation {
  createWorkOrder: CreateWorkOrderMutation_createWorkOrder;
}

export interface CreateWorkOrderMutationVariables {
  input: CreateWorkOrderInput;
}
