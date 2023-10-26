/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WorkOrdersByIdsQuery
// ====================================================

export interface WorkOrdersByIdsQuery_workOrdersByIds_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
  categoryId: number | null;
}

export interface WorkOrdersByIdsQuery_workOrdersByIds_results_rows_benefit_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface WorkOrdersByIdsQuery_workOrdersByIds_results_rows_benefit {
  __typename: "Benefit";
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category: WorkOrdersByIdsQuery_workOrdersByIds_results_rows_benefit_category;
}

export interface WorkOrdersByIdsQuery_workOrdersByIds_results_rows {
  __typename: "WorkOrderRow";
  id: number;
  done: boolean;
  benefit: WorkOrdersByIdsQuery_workOrdersByIds_results_rows_benefit;
}

export interface WorkOrdersByIdsQuery_workOrdersByIds_results {
  __typename: "WorkOrder";
  id: number;
  object: string;
  customerId: number | null;
  customer: WorkOrdersByIdsQuery_workOrdersByIds_results_customer | null;
  rows: WorkOrdersByIdsQuery_workOrdersByIds_results_rows[] | null;
}

export interface WorkOrdersByIdsQuery_workOrdersByIds {
  __typename: "WorkOrdersByIdsOutput";
  ok: boolean | null;
  error: string | null;
  results: WorkOrdersByIdsQuery_workOrdersByIds_results[] | null;
}

export interface WorkOrdersByIdsQuery {
  workOrdersByIds: WorkOrdersByIdsQuery_workOrdersByIds;
}

export interface WorkOrdersByIdsQueryVariables {
  ids: number[];
}
