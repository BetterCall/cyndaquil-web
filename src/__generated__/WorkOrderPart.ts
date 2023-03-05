/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkOrderType, WorkOrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: WorkOrderPart
// ====================================================

export interface WorkOrderPart {
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
}
