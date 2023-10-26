/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EquipmentFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: EquipmentsQuery
// ====================================================

export interface EquipmentsQuery_equipments_results_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface EquipmentsQuery_equipments_results_reference {
  __typename: "Reference";
  id: number;
  name: string;
}

export interface EquipmentsQuery_equipments_results {
  __typename: "Equipment";
  id: number;
  category: EquipmentsQuery_equipments_results_category | null;
  reference: EquipmentsQuery_equipments_results_reference | null;
}

export interface EquipmentsQuery_equipments {
  __typename: "EquipmentsOutput";
  hasMore: boolean | null;
  total: number | null;
  results: EquipmentsQuery_equipments_results[] | null;
}

export interface EquipmentsQuery {
  equipments: EquipmentsQuery_equipments;
}

export interface EquipmentsQueryVariables {
  limit: number;
  offset: number;
  where: EquipmentFiltersInput;
}
