/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EquipmentQuery
// ====================================================

export interface EquipmentQuery_equipment_result_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface EquipmentQuery_equipment_result {
  __typename: "Equipment";
  id: number;
  category: EquipmentQuery_equipment_result_category | null;
}

export interface EquipmentQuery_equipment {
  __typename: "EquipmentOutput";
  ok: boolean | null;
  error: string | null;
  result: EquipmentQuery_equipment_result | null;
}

export interface EquipmentQuery {
  equipment: EquipmentQuery_equipment;
}

export interface EquipmentQueryVariables {
  id: number;
}
