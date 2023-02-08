import { useLazyQuery, useQuery } from "@apollo/client";
import { INVOICES } from '../invoices.queries';
import { InvoicesQuery, InvoicesQueryVariables } from "../../../__generated__/InvoicesQuery";

export const useInvoices = (variables: InvoicesQueryVariables) => {
    return useQuery<InvoicesQuery, InvoicesQueryVariables>(INVOICES, { variables });
}

export const useLazyInvoices = () => {
    return useLazyQuery<
        InvoicesQuery,
        InvoicesQueryVariables
    >(INVOICES);
}