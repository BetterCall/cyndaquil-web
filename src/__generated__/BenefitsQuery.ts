/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BenefitFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: BenefitsQuery
// ====================================================

export interface BenefitsQuery_benefits_results_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface BenefitsQuery_benefits_results {
  __typename: "Benefit";
  id: number;
  name: string;
  price: number;
  category: BenefitsQuery_benefits_results_category;
}

export interface BenefitsQuery_benefits {
  __typename: "BenefitsOutput";
  total: number | null;
  results: BenefitsQuery_benefits_results[] | null;
}

export interface BenefitsQuery {
  benefits: BenefitsQuery_benefits;
}

export interface BenefitsQueryVariables {
  where: BenefitFiltersInput;
}
