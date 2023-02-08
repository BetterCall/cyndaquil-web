import { useQuery } from "@apollo/client";
import { PAYMENT } from '../payments.queries';
import { PaymentQuery, PaymentQueryVariables } from '../../../__generated__/PaymentQuery';

export const usePayment = (id: number) => {
    return useQuery<PaymentQuery, PaymentQueryVariables>(PAYMENT, { variables: { id } });
}

