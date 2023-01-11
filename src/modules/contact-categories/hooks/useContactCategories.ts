import { useLazyQuery, useQuery } from "@apollo/client";
import { CONTACT_CATEGORIES } from '../contact-categories.queries';
import { ContactCategoriesQuery } from '../../../__generated__/ContactCategoriesQuery';

export const useContactCategories = () => {
    return useQuery<ContactCategoriesQuery>(CONTACT_CATEGORIES);
}

export const useLazyContactCategories = () => {
    return useLazyQuery<ContactCategoriesQuery>(CONTACT_CATEGORIES);
}