/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFloorMutation
// ====================================================

export interface RemoveFloorMutation_removeFloor {
  __typename: "RemoveFloorOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveFloorMutation {
  removeFloor: RemoveFloorMutation_removeFloor;
}

export interface RemoveFloorMutationVariables {
  id: number;
}
