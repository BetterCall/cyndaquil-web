/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EquipmentInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: EquipmentQuery
// ====================================================

export interface EquipmentQuery_equipment_result_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface EquipmentQuery_equipment_result_reference_brand {
  __typename: "Brand";
  id: number;
  name: string;
}

export interface EquipmentQuery_equipment_result_reference {
  __typename: "Reference";
  id: number;
  name: string;
  brand: EquipmentQuery_equipment_result_reference_brand | null;
}

export interface EquipmentQuery_equipment_result_emplacement_site {
  __typename: "Site";
  id: number;
  name: string;
  city: string;
}

export interface EquipmentQuery_equipment_result_emplacement {
  __typename: "Emplacement";
  id: number;
  informations: string;
  siteId: number | null;
  site: EquipmentQuery_equipment_result_emplacement_site | null;
  building: string;
  entrance: string | null;
  floor: number;
  code: number | null;
}

export interface EquipmentQuery_equipment_result_controls_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface EquipmentQuery_equipment_result_controls {
  __typename: "Control";
  id: number;
  comment: string;
  user: EquipmentQuery_equipment_result_controls_user;
  createdAt: any;
}

export interface EquipmentQuery_equipment_result {
  __typename: "Equipment";
  id: number;
  code: number;
  informations: string | null;
  categoryId: number | null;
  category: EquipmentQuery_equipment_result_category | null;
  referenceId: number | null;
  reference: EquipmentQuery_equipment_result_reference | null;
  emplacement: EquipmentQuery_equipment_result_emplacement | null;
  controls: EquipmentQuery_equipment_result_controls[] | null;
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
  where: EquipmentInput;
}
