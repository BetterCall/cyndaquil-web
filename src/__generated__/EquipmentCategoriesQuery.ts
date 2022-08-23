/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EquipmentCategoriesQuery
// ====================================================

export interface EquipmentCategoriesQuery_equipmentCategories_results {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface EquipmentCategoriesQuery_equipmentCategories {
  __typename: "EquipmentCategoriesOutput";
  results: EquipmentCategoriesQuery_equipmentCategories_results[] | null;
}

export interface EquipmentCategoriesQuery {
  equipmentCategories: EquipmentCategoriesQuery_equipmentCategories;
}
