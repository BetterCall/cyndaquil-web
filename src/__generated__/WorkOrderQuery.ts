/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkOrderType, WorkOrderStatus } from "./globalTypes";

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

export interface WorkOrderQuery_workOrder_result_emplacements_emplacement_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface WorkOrderQuery_workOrder_result_emplacements_emplacement_floor_entrance_building {
  __typename: "Building";
  id: number;
  name: string;
}

export interface WorkOrderQuery_workOrder_result_emplacements_emplacement_floor_entrance {
  __typename: "Entrance";
  id: number;
  name: string;
  building: WorkOrderQuery_workOrder_result_emplacements_emplacement_floor_entrance_building;
}

export interface WorkOrderQuery_workOrder_result_emplacements_emplacement_floor {
  __typename: "Floor";
  id: number;
  name: string;
  entrance: WorkOrderQuery_workOrder_result_emplacements_emplacement_floor_entrance;
}

export interface WorkOrderQuery_workOrder_result_emplacements_emplacement {
  __typename: "Emplacement";
  id: number;
  category: WorkOrderQuery_workOrder_result_emplacements_emplacement_category | null;
  floor: WorkOrderQuery_workOrder_result_emplacements_emplacement_floor | null;
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
  site: WorkOrderQuery_workOrder_result_site | null;
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
