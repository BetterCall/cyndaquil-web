import { useLazyQuery, useQuery } from "@apollo/client";
import { PAYMENTS } from '../payments.queries';
import { PaymentsQuery, PaymentsQueryVariables } from "../../../__generated__/PaymentsQuery";

export const usePayments = (variables: PaymentsQueryVariables) => {
    return useQuery<PaymentsQuery, PaymentsQueryVariables>(PAYMENTS, { variables });
}

export const useLazyPayments = () => {
    return useLazyQuery<
        PaymentsQuery,
        PaymentsQueryVariables
    >(PAYMENTS);
}