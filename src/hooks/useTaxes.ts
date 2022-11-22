import React from 'react'
import { useQuery } from "@apollo/client";
import { TAXES } from '../queries/taxes.queries';
import { TaxesQuery } from '../__generated__/TaxesQuery';


export const useTaxes = () => {
    return useQuery<TaxesQuery>(TAXES);
}