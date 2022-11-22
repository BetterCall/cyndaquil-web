/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PriceRulesFiltersInput, PriceRuleType } from "./globalTypes";

// ====================================================
// GraphQL query operation: PriceRulesQuery
// ====================================================

export interface PriceRulesQuery_priceRules_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface PriceRulesQuery_priceRules_results_benefit {
  __typename: "Benefit";
  id: number;
  name: string;
}

export interface PriceRulesQuery_priceRules_results_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface PriceRulesQuery_priceRules_results {
  __typename: "PriceRule";
  id: number;
  amount: number;
  description: string;
  type: PriceRuleType;
  customer: PriceRulesQuery_priceRules_results_customer;
  benefit: PriceRulesQuery_priceRules_results_benefit | null;
  category: PriceRulesQuery_priceRules_results_category | null;
}

export interface PriceRulesQuery_priceRules {
  __typename: "PriceRulesOutput";
  hasMore: boolean | null;
  results: PriceRulesQuery_priceRules_results[] | null;
}

export interface PriceRulesQuery {
  priceRules: PriceRulesQuery_priceRules;
}

export interface PriceRulesQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: PriceRulesFiltersInput;
}
