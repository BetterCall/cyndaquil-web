import { useQuery } from "@apollo/client";
import { CUSTOMER_CATEGORY } from '../customer-categories.queries';
import { CustomerCategoryQuery, CustomerCategoryQueryVariables } from '../../../__generated__/CustomerCategoryQuery';

export const useCustomerCategory = (id: number) => {
    return useQuery<CustomerCategoryQuery, CustomerCategoryQueryVariables>(CUSTOMER_CATEGORY, { variables: { id } });
}

