import { useQuery } from "@apollo/client";
import { BrandQuery, BrandQueryVariables } from "../../../__generated__/BrandQuery";
import { BRAND } from '../brands.queries';

export const useBrand = (id: number) => {
    return useQuery<BrandQuery, BrandQueryVariables>(BRAND, { variables: { id } });
}

