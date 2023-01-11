import { useLazyQuery, useQuery } from "@apollo/client";
import { TAXES } from '../taxes.queries';
import { TaxesQuery } from '../../../__generated__/TaxesQuery';

export const useTaxes = () => {
    return useQuery<TaxesQuery>(TAXES);
}

export const useLazyTaxes = () => {
    return useLazyQuery<TaxesQuery>(TAXES);
}