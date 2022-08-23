/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CallsFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: CallsQuery
// ====================================================

export interface CallsQuery_calls_results_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface CallsQuery_calls_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface CallsQuery_calls_results_site {
  __typename: "Site";
  id: number;
  name: string;
  city: string;
}

export interface CallsQuery_calls_results {
  __typename: "Call";
  id: number;
  user: CallsQuery_calls_results_user;
  customer: CallsQuery_calls_results_customer | null;
  site: CallsQuery_calls_results_site;
}

export interface CallsQuery_calls {
  __typename: "CallsOutput";
  hasMore: boolean | null;
  results: CallsQuery_calls_results[] | null;
}

export interface CallsQuery {
  calls: CallsQuery_calls;
}

export interface CallsQueryVariables {
  limit: number;
  offset: number;
  where: CallsFiltersInput;
}
