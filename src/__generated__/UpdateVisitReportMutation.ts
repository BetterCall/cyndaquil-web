/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateVisitReportInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateVisitReportMutation
// ====================================================

export interface UpdateVisitReportMutation_updateVisitReport {
  __typename: "UpdateVisitReportOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateVisitReportMutation {
  updateVisitReport: UpdateVisitReportMutation_updateVisitReport;
}

export interface UpdateVisitReportMutationVariables {
  id: number;
  input: UpdateVisitReportInput;
}
