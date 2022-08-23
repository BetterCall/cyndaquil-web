/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBuildingInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateBuildingMutation
// ====================================================

export interface CreateBuildingMutation_createBuilding {
  __typename: "CreateBuildingOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface CreateBuildingMutation {
  createBuilding: CreateBuildingMutation_createBuilding;
}

export interface CreateBuildingMutationVariables {
  input: CreateBuildingInput;
}
