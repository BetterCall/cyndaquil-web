/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmplacementsFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: EmplacementsQuery
// ====================================================

export interface EmplacementsQuery_emplacements_results_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface EmplacementsQuery_emplacements_results_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface EmplacementsQuery_emplacements_results_equipment {
  __typename: "Equipment";
  id: number;
  code: number;
}

export interface EmplacementsQuery_emplacements_results {
  __typename: "Emplacement";
  id: number;
  building: string;
  entrance: string | null;
  floor: number;
  code: number | null;
  informations: string;
  siteId: number | null;
  site: EmplacementsQuery_emplacements_results_site | null;
  categoryId: number | null;
  category: EmplacementsQuery_emplacements_results_category | null;
  equipmentId: number | null;
  equipment: EmplacementsQuery_emplacements_results_equipment | null;
}

export interface EmplacementsQuery_emplacements {
  __typename: "EmplacementsOutput";
  hasMore: boolean | null;
  results: EmplacementsQuery_emplacements_results[] | null;
}

export interface EmplacementsQuery {
  emplacements: EmplacementsQuery_emplacements;
}

export interface EmplacementsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: EmplacementsFiltersInput;
}
