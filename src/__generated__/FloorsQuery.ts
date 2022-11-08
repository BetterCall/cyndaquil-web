/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FloorType } from "./globalTypes";

// ====================================================
// GraphQL query operation: FloorsQuery
// ====================================================

export interface FloorsQuery_floors_results_emplacements_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface FloorsQuery_floors_results_emplacements {
  __typename: "Emplacement";
  id: number;
  category: FloorsQuery_floors_results_emplacements_category | null;
}

export interface FloorsQuery_floors_results {
  __typename: "Floor";
  id: number;
  name: string;
  type: FloorType;
  order: number;
  emplacements: FloorsQuery_floors_results_emplacements[];
}

export interface FloorsQuery_floors {
  __typename: "FloorsOutput";
  ok: boolean | null;
  error: string | null;
  results: FloorsQuery_floors_results[] | null;
}

export interface FloorsQuery {
  floors: FloorsQuery_floors;
}

export interface FloorsQueryVariables {
  entranceId: number;
}
