/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditWorkOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditWorkOrderMutation
// ====================================================

export interface EditWorkOrderMutation_editWorkOrder {
  __typename: "EditWorkOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface EditWorkOrderMutation {
  editWorkOrder: EditWorkOrderMutation_editWorkOrder;
}

export interface EditWorkOrderMutationVariables {
  id: number;
  input: EditWorkOrderInput;
}
