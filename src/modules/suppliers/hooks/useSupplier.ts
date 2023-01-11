import { useQuery } from "@apollo/client";
import { SUPPLIER } from '../suppliers.queries';
import { SupplierQuery, SupplierQueryVariables } from '../../../__generated__/SupplierQuery';

export const useSupplier = (id: number) => {
    return useQuery<SupplierQuery, SupplierQueryVariables>(SUPPLIER, { variables: { id } });
}

