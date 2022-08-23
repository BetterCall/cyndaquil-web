/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContractStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: SiteEmplacementsQuery
// ====================================================

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_quotations_contract {
  __typename: "Contract";
  id: number;
  status: ContractStatus;
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_quotations {
  __typename: "ContractEmplacement";
  id: number;
  contract: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_quotations_contract;
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements {
  __typename: "Emplacement";
  id: number;
  category: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_category | null;
  quotations: SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors_emplacements_quotations[] | null;
}

export interface SiteEmplacementsQuery_siteEmplacements_result_buildings_entrances_floors {
  __typename: "Floor";
  id: number;
  name: string;
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
  buildings: SiteEmplacementsQuery_siteEmplacements_result_buildings[];
}

export interface SiteEmplacementsQuery_siteEmplacements {
  __typename: "SiteOutput";
  ok: boolean;
  error: string | null;
  result: SiteEmplacementsQuery_siteEmplacements_result | null;
}

export interface SiteEmplacementsQuery {
  siteEmplacements: SiteEmplacementsQuery_siteEmplacements;
}

export interface SiteEmplacementsQueryVariables {
  id: number;
}
