import { useQuery } from "@apollo/client";
import { PRICE_RULE } from '../prices.queries';
import { PriceRuleQuery, PriceRuleQueryVariables } from '../../../__generated__/PriceRuleQuery';

export const usePrice = (id: number) => {
    return useQuery<PriceRuleQuery, PriceRuleQueryVariables>(PRICE_RULE, { variables: { id } });
}

