import { useQuery } from "@apollo/client";
import { CONTACT } from '../contacts.queries';
import { ContactQuery, ContactQueryVariables } from '../../../__generated__/ContactQuery';

export const useContact = (id: number) => {
    return useQuery<ContactQuery, ContactQueryVariables>(CONTACT, { variables: { id } });
}

