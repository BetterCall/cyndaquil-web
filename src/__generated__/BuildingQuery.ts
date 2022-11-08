/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BuildingQuery
// ====================================================

export interface BuildingQuery_building_result_entrances {
  __typename: "Entrance";
  id: number;
  name: string;
}

export interface BuildingQuery_building_result {
  __typename: "Building";
  id: number;
  name: string;
  entrances: BuildingQuery_building_result_entrances[];
}

export interface BuildingQuery_building {
  __typename: "BuildingOutput";
  ok: boolean | null;
  error: string | null;
  result: BuildingQuery_building_result | null;
}

export interface BuildingQuery {
  building: BuildingQuery_building;
}

export interface BuildingQueryVariables {
  id: number;
}
