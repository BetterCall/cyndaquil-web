import React from 'react'
import { useQuery } from "@apollo/client";
import { CUSTOMER_CATEGORIES } from "../queries/customer-categories.queries";
import { CustomerCategoriesQuery } from '../__generated__/CustomerCategoriesQuery';


export const useCustomerCategories = () => {
    return useQuery<CustomerCategoriesQuery>(CUSTOMER_CATEGORIES);
}