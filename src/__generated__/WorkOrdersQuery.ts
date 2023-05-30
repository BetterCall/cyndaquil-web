/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkOrderFiltersInput, WorkOrderType, WorkOrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: WorkOrdersQuery
// ====================================================

export interface WorkOrdersQuery_workOrders_results_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface WorkOrdersQuery_workOrders_results_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface WorkOrdersQuery_workOrders_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
  category: WorkOrdersQuery_workOrders_results_customer_category | null;
}

export interface WorkOrdersQuery_workOrders_results_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface WorkOrdersQuery_workOrders_results {
  __typename: "WorkOrder";
  id: number;
  object: string;
  description: string | null;
  billable: boolean;
  appointment: boolean;
  imperative: boolean;
  type: WorkOrderType;
  date: string | null;
  start: string | null;
  end: string | null;
  status: WorkOrderStatus;
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  user: WorkOrdersQuery_workOrders_results_user | null;
  customer: WorkOrdersQuery_workOrders_results_customer | null;
  site: WorkOrdersQuery_workOrders_results_site | null;
}

export interface WorkOrdersQuery_workOrders {
  __typename: "WorkOrdersOutput";
  hasMore: boolean | null;
  results: WorkOrdersQuery_workOrders_results[] | null;
}

export interface WorkOrdersQuery {
  workOrders: WorkOrdersQuery_workOrders;
}

export interface WorkOrdersQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: WorkOrderFiltersInput;
}
