/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BenefitFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: BenefitsQuery
// ====================================================

export interface BenefitsQuery_benefits_results {
  __typename: "Benefit";
  id: number;
  name: string;
  price: number;
}

export interface BenefitsQuery_benefits {
  __typename: "BenefitsOutput";
  results: BenefitsQuery_benefits_results[] | null;
}

export interface BenefitsQuery {
  benefits: BenefitsQuery_benefits;
}

export interface BenefitsQueryVariables {
  where: BenefitFiltersInput;
}
