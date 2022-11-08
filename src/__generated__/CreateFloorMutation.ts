/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateFloorInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFloorMutation
// ====================================================

export interface CreateFloorMutation_createFloor {
  __typename: "CreateFloorOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateFloorMutation {
  createFloor: CreateFloorMutation_createFloor;
}

export interface CreateFloorMutationVariables {
  input: CreateFloorInput;
}
