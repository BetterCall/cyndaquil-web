import { useLazyQuery, useQuery } from "@apollo/client";
import { CONTACTS } from '../contacts.queries';
import { ContactsQuery, ContactsQueryVariables } from '../../../__generated__/ContactsQuery';

export const useContacts = (variables: ContactsQueryVariables) => {
    return useQuery<ContactsQuery, ContactsQueryVariables>(CONTACTS, { variables });
}

export const useLazyContacts = () => {
    return useLazyQuery<
        ContactsQuery,
        ContactsQueryVariables
    >(CONTACTS);
}