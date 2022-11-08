/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEquipmentCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEquipmentCategoryMutation
// ====================================================

export interface UpdateEquipmentCategoryMutation_updateEquipmentCategory {
  __typename: "UpdateEquipmentCategoryOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateEquipmentCategoryMutation {
  updateEquipmentCategory: UpdateEquipmentCategoryMutation_updateEquipmentCategory;
}

export interface UpdateEquipmentCategoryMutationVariables {
  id: number;
  input: UpdateEquipmentCategoryInput;
}
