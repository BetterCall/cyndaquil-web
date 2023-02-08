/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DemandsFiltersInput, DemandType } from "./globalTypes";

// ====================================================
// GraphQL query operation: DemandsQuery
// ====================================================

export interface DemandsQuery_demands_results_openedBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface DemandsQuery_demands_results_targetUser {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface DemandsQuery_demands_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface DemandsQuery_demands_results_site {
  __typename: "Site";
  id: number;
  name: string;
  city: string;
}

export interface DemandsQuery_demands_results {
  __typename: "Demand";
  id: number;
  type: DemandType;
  openedById: number | null;
  openedBy: DemandsQuery_demands_results_openedBy;
  targetUserId: number | null;
  targetUser: DemandsQuery_demands_results_targetUser;
  customerId: number | null;
  customer: DemandsQuery_demands_results_customer | null;
  siteId: number | null;
  site: DemandsQuery_demands_results_site;
}

export interface DemandsQuery_demands {
  __typename: "DemandsOutput";
  hasMore: boolean | null;
  results: DemandsQuery_demands_results[] | null;
}

export interface DemandsQuery {
  demands: DemandsQuery_demands;
}

export interface DemandsQueryVariables {
  limit: number;
  offset: number;
  where: DemandsFiltersInput;
}
