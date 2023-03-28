/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VisitFiltersInput, VisitStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: VisitsQuery
// ====================================================

export interface VisitsQuery_visits_results_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface VisitsQuery_visits_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface VisitsQuery_visits_results {
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
  user: VisitsQuery_visits_results_user | null;
  customer: VisitsQuery_visits_results_customer | null;
}

export interface VisitsQuery_visits {
  __typename: "VisitsOutput";
  hasMore: boolean | null;
  ok: boolean | null;
  error: string | null;
  results: VisitsQuery_visits_results[] | null;
}

export interface VisitsQuery {
  visits: VisitsQuery_visits;
}

export interface VisitsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: VisitFiltersInput;
}
