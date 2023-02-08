/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DemandType } from "./globalTypes";

// ====================================================
// GraphQL query operation: DemandQuery
// ====================================================

export interface DemandQuery_demand_result_openedBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface DemandQuery_demand_result_targetUser {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface DemandQuery_demand_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface DemandQuery_demand_result_site {
  __typename: "Site";
  id: number;
  name: string;
  city: string;
}

export interface DemandQuery_demand_result {
  __typename: "Demand";
  id: number;
  type: DemandType;
  object: string;
  report: string | null;
  treated: boolean;
  message: string | null;
  openedById: number | null;
  openedBy: DemandQuery_demand_result_openedBy;
  targetUserId: number | null;
  targetUser: DemandQuery_demand_result_targetUser;
  customerId: number | null;
  customer: DemandQuery_demand_result_customer | null;
  siteId: number | null;
  site: DemandQuery_demand_result_site;
}

export interface DemandQuery_demand {
  __typename: "DemandOutput";
  ok: boolean | null;
  error: string | null;
  result: DemandQuery_demand_result | null;
}

export interface DemandQuery {
  demand: DemandQuery_demand;
}

export interface DemandQueryVariables {
  id: number;
}
