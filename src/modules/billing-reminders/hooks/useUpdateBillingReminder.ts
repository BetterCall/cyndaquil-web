import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UPDATE_BILLING_REMINDER } from "../billing-reminders.queries";
import {
    UpdateBillingReminderMutation,
    UpdateBillingReminderMutationVariables
} from "../../../__generated__/UpdateBillingReminderMutation";
import { parseParams } from "../../../helpers/clean-object";
import { UpdateBillingReminderInput } from "../../../__generated__/globalTypes";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateBillingReminder = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateBillingReminderInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateBillingReminderMutation, UpdateBillingReminderMutationVariables>(UPDATE_BILLING_REMINDER)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.updateBillingReminder?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateBillingReminder?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        form,
        mutate,
        loading,
        submit
    }
}

