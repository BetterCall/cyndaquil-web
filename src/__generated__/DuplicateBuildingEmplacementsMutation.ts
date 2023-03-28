/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DuplicateBuildingEmplacementsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DuplicateBuildingEmplacementsMutation
// ====================================================

export interface DuplicateBuildingEmplacementsMutation_duplicateBuildingEmplacements {
  __typename: "DuplicateBuildingEmplacementsOutput";
  ok: boolean | null;
  error: string | null;
}

export interface DuplicateBuildingEmplacementsMutation {
  duplicateBuildingEmplacements: DuplicateBuildingEmplacementsMutation_duplicateBuildingEmplacements;
}

export interface DuplicateBuildingEmplacementsMutationVariables {
  input: DuplicateBuildingEmplacementsInput;
}
