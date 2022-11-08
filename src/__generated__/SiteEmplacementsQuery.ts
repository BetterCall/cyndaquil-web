/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FloorType, ContractStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: SiteEmplacementsQuery
// ====================================================

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_contractRows_contract {
  __typename: "Contract";
  id: number;
  status: ContractStatus;
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_contractRows {
  __typename: "ContractRow";
  id: number;
  contract: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_contractRows_contract;
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements {
  __typename: "Emplacement";
  id: number;
  category: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_category | null;
  contractRows: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_contractRows[] | null;
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors {
  __typename: "Floor";
  id: number;
  name: string;
  type: FloorType;
  order: number;
  emplacements: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements[];
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances {
  __typename: "Entrance";
  id: number;
  name: string;
  floors: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors[];
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings {
  __typename: "Building";
  id: number;
  name: string;
  entrances: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances[];
}

export interface SiteEmplacementsQuery_siteEmplacements_result {
  __typename: "Site";
  id: number;
  name: string;
  completed: boolean;
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  buildings: SiteEmplacementsQuery_siteEmplacements_result_buildings[];
}

export interface SiteEmplacementsQuery_siteEmplacements {
  __typename: "SiteOutput";
  ok: boolean | null;
  error: string | null;
  result: SiteEmplacementsQuery_siteEmplacements_result | null;
}

export interface SiteEmplacementsQuery {
  siteEmplacements: SiteEmplacementsQuery_siteEmplacements;
}

export interface SiteEmplacementsQueryVariables {
  id: number;
}
