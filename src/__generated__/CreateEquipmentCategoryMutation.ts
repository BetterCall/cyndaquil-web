/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEquipmentCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEquipmentCategoryMutation
// ====================================================

export interface CreateEquipmentCategoryMutation_createEquipmentCategory {
  __typename: "CreateEquipmentCategoryOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateEquipmentCategoryMutation {
  createEquipmentCategory: CreateEquipmentCategoryMutation_createEquipmentCategory;
}

export interface CreateEquipmentCategoryMutationVariables {
  input: CreateEquipmentCategoryInput;
}
