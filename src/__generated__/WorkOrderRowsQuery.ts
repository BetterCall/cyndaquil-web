/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkOrderRowFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: WorkOrderRowsQuery
// ====================================================

export interface WorkOrderRowsQuery_workOrderRows_results_workOrder {
  __typename: "WorkOrder";
  id: number;
  date: string | null;
  start: string | null;
}

export interface WorkOrderRowsQuery_workOrderRows_results_emplacement_site {
  __typename: "Site";
  id: number;
  name: string;
  city: string;
}

export interface WorkOrderRowsQuery_workOrderRows_results_emplacement_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface WorkOrderRowsQuery_workOrderRows_results_emplacement {
  __typename: "Emplacement";
  id: number;
  building: string;
  entrance: string | null;
  floor: number;
  siteId: number | null;
  site: WorkOrderRowsQuery_workOrderRows_results_emplacement_site | null;
  categoryId: number | null;
  category: WorkOrderRowsQuery_workOrderRows_results_emplacement_category | null;
}

export interface WorkOrderRowsQuery_workOrderRows_results_benefit {
  __typename: "Benefit";
  id: number;
  name: string;
}

export interface WorkOrderRowsQuery_workOrderRows_results {
  __typename: "WorkOrderRow";
  id: number;
  done: boolean;
  workOrderId: number;
  workOrder: WorkOrderRowsQuery_workOrderRows_results_workOrder;
  emplacementId: number;
  emplacement: WorkOrderRowsQuery_workOrderRows_results_emplacement;
  benefitId: number;
  benefit: WorkOrderRowsQuery_workOrderRows_results_benefit;
}

export interface WorkOrderRowsQuery_workOrderRows {
  __typename: "WorkOrderRowsOutput";
  ok: boolean | null;
  error: string | null;
  results: WorkOrderRowsQuery_workOrderRows_results[] | null;
}

export interface WorkOrderRowsQuery {
  workOrderRows: WorkOrderRowsQuery_workOrderRows;
}

export interface WorkOrderRowsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: WorkOrderRowFiltersInput;
}
