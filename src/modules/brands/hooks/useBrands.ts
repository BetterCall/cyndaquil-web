import React from 'react'
import { useLazyQuery, useQuery } from "@apollo/client";
import { BRANDS } from '../brands.queries';
import { BrandsQuery, BrandsQueryVariables } from '../../../__generated__/BrandsQuery';

export const useBrands = (variables: BrandsQueryVariables) => {
    return useQuery<BrandsQuery, BrandsQueryVariables>(BRANDS, { variables });
}

export const useLazyBrands = () => {
    return useLazyQuery<
        BrandsQuery,
        BrandsQueryVariables
    >(BRANDS);
}