/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ControlQuery
// ====================================================

export interface ControlQuery_control_result {
  __typename: "Control";
  id: number;
}

export interface ControlQuery_control {
  __typename: "ControlOutput";
  ok: boolean | null;
  error: string | null;
  result: ControlQuery_control_result | null;
}

export interface ControlQuery {
  control: ControlQuery_control;
}

export interface ControlQueryVariables {
  id: number;
}
