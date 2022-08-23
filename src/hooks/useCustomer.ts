import { useLazyQuery, useQuery } from "@apollo/client";
import { CUSTOMER } from "../queries/customers.queries";
import { CustomerQuery, CustomerQueryVariables } from "../__generated__/CustomerQuery";


export const useCustomer = (id: number) => {
    return useQuery<
        CustomerQuery,
        CustomerQueryVariables
    >(CUSTOMER, {
        variables: {
            id,
        },
    });
}

export const useLazyCustomer = () => {
    return useLazyQuery<
        CustomerQuery,
        CustomerQueryVariables
    >(CUSTOMER);
}