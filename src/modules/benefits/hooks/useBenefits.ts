import React from 'react'
import { useLazyQuery, useQuery } from "@apollo/client";
import { BENEFITS } from '../benefits.queries';
import { BenefitsQuery, BenefitsQueryVariables } from '../../../__generated__/BenefitsQuery';

export const useBenefits = ({ where }: BenefitsQueryVariables) => {
    return useQuery<BenefitsQuery, BenefitsQueryVariables>(BENEFITS, { variables: { where } });
}

export const useLazyBenefit = () => {
    return useLazyQuery<
        BenefitsQuery,
        BenefitsQueryVariables
    >(BENEFITS);
}