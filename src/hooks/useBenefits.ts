import React from 'react'
import { useQuery } from "@apollo/client";
import { BENEFITS } from '../queries/benefits.queries';
import { BenefitsQuery, BenefitsQueryVariables } from '../__generated__/BenefitsQuery';


export const useBenefits = ({ where }: BenefitsQueryVariables) => {
    return useQuery<BenefitsQuery, BenefitsQueryVariables>(BENEFITS, { variables: { where } });
}