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
  phone: string;
  email: string | null;
}

export interface WorkOrderQuery_workOrder_result_rows_emplacement_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface WorkOrderQuery_workOrder_result_rows_emplacement {
  __typename: "Emplacement";
  id: number;
  category: WorkOrderQuery_workOrder_result_rows_emplacement_category | null;
  building: string;
  entrance: string | null;
  floor: number;
}

export interface WorkOrderQuery_workOrder_result_rows_benefit {
  __typename: "Benefit";
  id: number;
  name: string;
}

export interface WorkOrderQuery_workOrder_result_rows {
  __typename: "WorkOrderRow";
  id: number;
  done: boolean;
  emplacement: WorkOrderQuery_workOrder_result_rows_emplacement;
  benefit: WorkOrderQuery_workOrder_result_rows_benefit;
}

export interface WorkOrderQuery_workOrder_result {
  __typename: "WorkOrder";
  id: number;
  object: string;
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
  rows: WorkOrderQuery_workOrder_result_rows[] | null;
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
