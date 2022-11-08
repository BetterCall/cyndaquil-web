/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateWorkOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateWorkOrderMutation
// ====================================================

export interface UpdateWorkOrderMutation_updateWorkOrder {
  __typename: "UpdateWorkOrderOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateWorkOrderMutation {
  updateWorkOrder: UpdateWorkOrderMutation_updateWorkOrder;
}

export interface UpdateWorkOrderMutationVariables {
  id: number;
  input: UpdateWorkOrderInput;
}
