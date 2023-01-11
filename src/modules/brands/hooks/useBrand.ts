import React from 'react'
import { useQuery } from "@apollo/client";
import { BRAND } from '../brands.queries';
import { BrandQuery, BrandQueryVariables } from '../../../__generated__/BrandQuery';

export const useBrand = (id: number) => {
    return useQuery<BrandQuery, BrandQueryVariables>(BRAND, { variables: { id } });
}

