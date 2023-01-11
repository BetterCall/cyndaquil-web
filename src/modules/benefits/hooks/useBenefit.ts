import React from 'react'
import { useQuery } from "@apollo/client";
import { BENEFIT } from '../benefits.queries';
import { BenefitQuery, BenefitQueryVariables } from '../../../__generated__/BenefitQuery';

export const useBenefit = (id: number) => {
    return useQuery<BenefitQuery, BenefitQueryVariables>(BENEFIT, { variables: { id } });
}

