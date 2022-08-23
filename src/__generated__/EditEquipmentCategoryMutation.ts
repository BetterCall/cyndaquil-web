/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditEquipmentCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditEquipmentCategoryMutation
// ====================================================

export interface EditEquipmentCategoryMutation_editEquipmentCategory {
  __typename: "EditEquipmentCategoryOutput";
  ok: boolean;
  error: string | null;
}

export interface EditEquipmentCategoryMutation {
  editEquipmentCategory: EditEquipmentCategoryMutation_editEquipmentCategory;
}

export interface EditEquipmentCategoryMutationVariables {
  id: number;
  input: EditEquipmentCategoryInput;
}
