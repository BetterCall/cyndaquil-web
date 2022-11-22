/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EquipmentCategoryQuery
// ====================================================

export interface EquipmentCategoryQuery_equipmentCategory_result_benefits_taxe {
  __typename: "Taxe";
  id: number;
  name: string;
  value: number;
}

export interface EquipmentCategoryQuery_equipmentCategory_result_benefits {
  __typename: "Benefit";
  id: number;
  name: string;
  price: number;
  taxe: EquipmentCategoryQuery_equipmentCategory_result_benefits_taxe | null;
}

export interface EquipmentCategoryQuery_equipmentCategory_result {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
  benefits: EquipmentCategoryQuery_equipmentCategory_result_benefits[] | null;
}

export interface EquipmentCategoryQuery_equipmentCategory {
  __typename: "EquipmentCategoryOutput";
  ok: boolean | null;
  error: string | null;
  result: EquipmentCategoryQuery_equipmentCategory_result | null;
}

export interface EquipmentCategoryQuery {
  equipmentCategory: EquipmentCategoryQuery_equipmentCategory;
}

export interface EquipmentCategoryQueryVariables {
  id: number;
}
