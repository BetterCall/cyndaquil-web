/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateWorkOrderRowInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateWorkOrderRowMutation
// ====================================================

export interface UpdateWorkOrderRowMutation_updateWorkOrderRow {
  __typename: "UpdateWorkOrderRowOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateWorkOrderRowMutation {
  updateWorkOrderRow: UpdateWorkOrderRowMutation_updateWorkOrderRow;
}

export interface UpdateWorkOrderRowMutationVariables {
  id: number;
  input: UpdateWorkOrderRowInput;
}
