/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateFloorInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateFloorMutation
// ====================================================

export interface UpdateFloorMutation_updateFloor {
  __typename: "UpdateFloorOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateFloorMutation {
  updateFloor: UpdateFloorMutation_updateFloor;
}

export interface UpdateFloorMutationVariables {
  id: number;
  input: UpdateFloorInput;
}
