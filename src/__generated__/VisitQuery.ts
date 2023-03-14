/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VisitStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: VisitQuery
// ====================================================

export interface VisitQuery_visit_result_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface VisitQuery_visit_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface VisitQuery_visit_result {
  __typename: "Visit";
  id: number;
  object: string;
  description: string | null;
  date: string | null;
  start: string | null;
  status: VisitStatus;
  report: string | null;
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  userId: number | null;
  user: VisitQuery_visit_result_user | null;
  customerId: number | null;
  customer: VisitQuery_visit_result_customer | null;
}

export interface VisitQuery_visit {
  __typename: "VisitOutput";
  ok: boolean | null;
  error: string | null;
  result: VisitQuery_visit_result | null;
}

export interface VisitQuery {
  visit: VisitQuery_visit;
}

export interface VisitQueryVariables {
  id: number;
}
