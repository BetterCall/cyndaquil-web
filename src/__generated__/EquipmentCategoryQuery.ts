/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EquipmentCategoryQuery
// ====================================================

export interface EquipmentCategoryQuery_equipmentCategory_result {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface EquipmentCategoryQuery_equipmentCategory {
  __typename: "EquipmentCategoryOutput";
  ok: boolean;
  error: string | null;
  result: EquipmentCategoryQuery_equipmentCategory_result | null;
}

export interface EquipmentCategoryQuery {
  equipmentCategory: EquipmentCategoryQuery_equipmentCategory;
}

export interface EquipmentCategoryQueryVariables {
  id: number;
}
