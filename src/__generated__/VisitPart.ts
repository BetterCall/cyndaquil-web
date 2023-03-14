/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VisitStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: VisitPart
// ====================================================

export interface VisitPart {
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
}
