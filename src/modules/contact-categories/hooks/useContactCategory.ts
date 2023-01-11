import { useQuery } from "@apollo/client";
import { CONTACT_CATEGORY } from '../contact-categories.queries';
import { ContactCategoryQuery, ContactCategoryQueryVariables } from '../../../__generated__/ContactCategoryQuery';

export const useContactCategory = (id: number) => {
    return useQuery<ContactCategoryQuery, ContactCategoryQueryVariables>(CONTACT_CATEGORY, { variables: { id } });
}

