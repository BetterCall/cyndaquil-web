/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DuplicateBuildingMutation
// ====================================================

export interface DuplicateBuildingMutation_duplicateBuilding {
  __typename: "DuplicateBuildingOutput";
  ok: boolean;
  error: string | null;
}

export interface DuplicateBuildingMutation {
  duplicateBuilding: DuplicateBuildingMutation_duplicateBuilding;
}

export interface DuplicateBuildingMutationVariables {
  buildingId: number;
}
