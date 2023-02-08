import { useLazyQuery, useQuery } from "@apollo/client";
import { INVOICE } from '../invoices.queries';
import { InvoiceQuery, InvoiceQueryVariables } from '../../../__generated__/InvoiceQuery';

export const useInvoice = (id: number) => {
    return useQuery<InvoiceQuery, InvoiceQueryVariables>(INVOICE, { variables: { id } });
}

export const useLazyInvoice = () => {
    return useLazyQuery<
        InvoiceQuery,
        InvoiceQueryVariables
    >(INVOICE)
}