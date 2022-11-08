/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EquipmentCategoriesQuery
// ====================================================

export interface EquipmentCategoriesQuery_equipmentCategories_results_benefits {
  __typename: "Benefit";
  id: number;
  name: string;
  price: number;
}

export interface EquipmentCategoriesQuery_equipmentCategories_results {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
  benefits: EquipmentCategoriesQuery_equipmentCategories_results_benefits[] | null;
}

export interface EquipmentCategoriesQuery_equipmentCategories {
  __typename: "EquipmentCategoriesOutput";
  results: EquipmentCategoriesQuery_equipmentCategories_results[] | null;
}

export interface EquipmentCategoriesQuery {
  equipmentCategories: EquipmentCategoriesQuery_equipmentCategories;
}
