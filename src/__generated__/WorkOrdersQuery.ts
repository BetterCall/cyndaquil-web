/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkOrderFiltersInput, WorkOrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: WorkOrdersQuery
// ====================================================

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
  name: string;
  status: WorkOrderStatus;
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  customer: WorkOrdersQuery_workOrders_results_customer;
  site: WorkOrdersQuery_workOrders_results_site;
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
  limit: number;
  offset: number;
  where: WorkOrderFiltersInput;
}
