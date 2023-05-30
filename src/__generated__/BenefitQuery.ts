/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BenefitQuery
// ====================================================

export interface BenefitQuery_benefit_result_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface BenefitQuery_benefit_result {
  __typename: "Benefit";
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category: BenefitQuery_benefit_result_category;
}

export interface BenefitQuery_benefit {
  __typename: "BenefitOutput";
  ok: boolean | null;
  error: string | null;
  result: BenefitQuery_benefit_result | null;
}

export interface BenefitQuery {
  benefit: BenefitQuery_benefit;
}

export interface BenefitQueryVariables {
  id: number;
}
