import { useLazyQuery, useQuery } from "@apollo/client";
import { SUPPLIERS } from '../suppliers.queries';
import { SuppliersQuery, SuppliersQueryVariables } from '../../../__generated__/SuppliersQuery';

export const useSuppliers = (variables: SuppliersQueryVariables) => {
    return useQuery<SuppliersQuery, SuppliersQueryVariables>(SUPPLIERS, { variables });
}

export const useLazySuppliers = () => {
    return useLazyQuery<
        SuppliersQuery,
        SuppliersQueryVariables
    >(SUPPLIERS);
}