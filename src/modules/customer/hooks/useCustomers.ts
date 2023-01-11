import { useLazyQuery, useQuery } from "@apollo/client";
import { CUSTOMERS } from '../customers.queries';
import { CustomersQuery, CustomersQueryVariables } from '../../../__generated__/CustomersQuery';

export const useCustomers = (variables: CustomersQueryVariables) => {
    return useQuery<CustomersQuery, CustomersQueryVariables>(CUSTOMERS, { variables });
}

export const useLazyCustomers = () => {
    return useLazyQuery<CustomersQuery, CustomersQueryVariables>(CUSTOMERS);
}