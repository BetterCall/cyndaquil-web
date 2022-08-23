/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkOrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: WorkOrderQuery
// ====================================================

export interface WorkOrderQuery_workOrder_result_site {
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
}

export interface WorkOrderQuery_workOrder_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
  email: string | null;
  phone: string;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  lat: number;
  lng: number;
}

export interface WorkOrderQuery_workOrder_result {
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
  site: WorkOrderQuery_workOrder_result_site;
  customer: WorkOrderQuery_workOrder_result_customer;
}

export interface WorkOrderQuery_workOrder {
  __typename: "WorkOrderOutput";
  ok: boolean;
  error: string | null;
  result: WorkOrderQuery_workOrder_result | null;
}

export interface WorkOrderQuery {
  workOrder: WorkOrderQuery_workOrder;
}

export interface WorkOrderQueryVariables {
  id: number;
}
