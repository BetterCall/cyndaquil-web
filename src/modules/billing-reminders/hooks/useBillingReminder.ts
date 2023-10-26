import { useLazyQuery, useQuery } from "@apollo/client";
import { BILLING_REMINDER } from '../billing-reminders.queries';
import { BillingReminderQuery, BillingReminderQueryVariables } from '../../../__generated__/BillingReminderQuery';

export const useBillingReminder = (id: number) => {
    return useQuery<BillingReminderQuery, BillingReminderQueryVariables>(BILLING_REMINDER, { variables: { id } });
}

export const useLazyBillingReminder = () => {
    return useLazyQuery<
        BillingReminderQuery,
        BillingReminderQueryVariables
    >(BILLING_REMINDER)
}