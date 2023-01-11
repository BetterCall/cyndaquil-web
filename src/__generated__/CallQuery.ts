/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CallQuery
// ====================================================

export interface CallQuery_call_result_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface CallQuery_call_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface CallQuery_call_result_site {
  __typename: "Site";
  id: number;
  name: string;
  city: string;
}

export interface CallQuery_call_result {
  __typename: "Call";
  id: number;
  user: CallQuery_call_result_user;
  customer: CallQuery_call_result_customer | null;
  site: CallQuery_call_result_site;
}

export interface CallQuery_call {
  __typename: "CallOutput";
  ok: boolean | null;
  error: string | null;
  result: CallQuery_call_result | null;
}

export interface CallQuery {
  call: CallQuery_call;
}

export interface CallQueryVariables {
  id: number;
}
