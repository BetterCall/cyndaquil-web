/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBuildingInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBuildingMutation
// ====================================================

export interface UpdateBuildingMutation_updateBuilding {
  __typename: "UpdateBuildingOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateBuildingMutation {
  updateBuilding: UpdateBuildingMutation_updateBuilding;
}

export interface UpdateBuildingMutationVariables {
  id: number;
  input: UpdateBuildingInput;
}
