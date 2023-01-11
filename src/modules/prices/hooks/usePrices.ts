import { useLazyQuery, useQuery } from "@apollo/client";
import { PRICE_RULES } from '../prices.queries';
import {
    PriceRulesQuery,
    PriceRulesQueryVariables
} from '../../../__generated__/PriceRulesQuery';

export const usePrices = (variables: PriceRulesQueryVariables) => {
    return useQuery<PriceRulesQuery, PriceRulesQueryVariables>(PRICE_RULES, { variables });
}

export const useLazyPrices = () => {
    return useLazyQuery<PriceRulesQuery, PriceRulesQueryVariables>(PRICE_RULES);
}