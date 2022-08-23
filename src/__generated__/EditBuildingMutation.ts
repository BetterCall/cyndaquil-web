/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditBuildingInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditBuildingMutation
// ====================================================

export interface EditBuildingMutation_editBuilding {
  __typename: "EditBuildingOutput";
  ok: boolean;
  error: string | null;
}

export interface EditBuildingMutation {
  editBuilding: EditBuildingMutation_editBuilding;
}

export interface EditBuildingMutationVariables {
  id: number;
  input: EditBuildingInput;
}
