import { useLazyQuery, useQuery } from "@apollo/client";
import { CustomerCategoriesQuery } from "../../../__generated__/CustomerCategoriesQuery";
import { CUSTOMER_CATEGORIES } from '../customer-categories.queries';

export const useCustomerCategories = () => {
    return useQuery<CustomerCategoriesQuery>(CUSTOMER_CATEGORIES);
}

export const useLazyCustomerCategories = () => {
    return useLazyQuery<CustomerCategoriesQuery>(CUSTOMER_CATEGORIES);
}