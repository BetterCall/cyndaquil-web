/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkOrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: WorkOrderPart
// ====================================================

export interface WorkOrderPart {
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
}
