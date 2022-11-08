/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveBuildingMutation
// ====================================================

export interface RemoveBuildingMutation_removeBuilding {
  __typename: "RemoveBuildingOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveBuildingMutation {
  removeBuilding: RemoveBuildingMutation_removeBuilding;
}

export interface RemoveBuildingMutationVariables {
  id: number;
}
