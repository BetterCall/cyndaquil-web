import { useQuery } from "@apollo/client";
import { TAXE } from '../taxes.queries';
import { TaxeQuery, TaxeQueryVariables } from '../../../__generated__/TaxeQuery';

export const useTaxe = (id: number) => {
    return useQuery<TaxeQuery, TaxeQueryVariables>(TAXE, { variables: { id } });
}

