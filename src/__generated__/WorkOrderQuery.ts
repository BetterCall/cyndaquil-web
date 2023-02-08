/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkOrderType, WorkOrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: WorkOrderQuery
// ====================================================

export interface WorkOrderQuery_workOrder_result_invoice {
  __typename: "Invoice";
  id: number;
  totalPrice: number;
}

export interface WorkOrderQuery_workOrder_result_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface WorkOrderQuery_workOrder_result_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface WorkOrderQuery_workOrder_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface WorkOrderQuery_workOrder_result_emplacements_emplacement_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface WorkOrderQuery_workOrder_result_emplacements_emplacement {
  __typename: "Emplacement";
  id: number;
  category: WorkOrderQuery_workOrder_result_emplacements_emplacement_category | null;
  building: string;
  entrance: string | null;
  floor: number;
}

export interface WorkOrderQuery_workOrder_result_emplacements {
  __typename: "WorkOrderEmplacement";
  id: number;
  emplacement: WorkOrderQuery_workOrder_result_emplacements_emplacement;
}

export interface WorkOrderQuery_workOrder_result {
  __typename: "WorkOrder";
  id: number;
  name: string;
  description: string | null;
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
  invoiceId: number | null;
  invoice: WorkOrderQuery_workOrder_result_invoice | null;
  userId: number | null;
  user: WorkOrderQuery_workOrder_result_user | null;
  siteId: number | null;
  site: WorkOrderQuery_workOrder_result_site | null;
  customerId: number | null;
  customer: WorkOrderQuery_workOrder_result_customer | null;
  emplacements: WorkOrderQuery_workOrder_result_emplacements[] | null;
}

export interface WorkOrderQuery_workOrder {
  __typename: "WorkOrderOutput";
  ok: boolean | null;
  error: string | null;
  result: WorkOrderQuery_workOrder_result | null;
}

export interface WorkOrderQuery {
  workOrder: WorkOrderQuery_workOrder;
}

export interface WorkOrderQueryVariables {
  id: number;
}
