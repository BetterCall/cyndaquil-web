import { useLazyQuery, useQuery } from "@apollo/client";
import { BILLING_REMINDERS } from '../billing-reminders.queries';
import { BillingRemindersQuery, BillingRemindersQueryVariables } from "../../../__generated__/BillingRemindersQuery";

export const useBillingReminders = (variables: BillingRemindersQueryVariables) => {
    return useQuery<BillingRemindersQuery, BillingRemindersQueryVariables>(BILLING_REMINDERS, { variables });
}

export const useLazyBillingReminders = () => {
    return useLazyQuery<
        BillingRemindersQuery,
        BillingRemindersQueryVariables
    >(BILLING_REMINDERS);
}