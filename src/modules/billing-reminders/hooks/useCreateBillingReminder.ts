import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CreateBillingReminderInput } from "../../../__generated__/globalTypes";
import { CreateBillingReminderMutation, CreateBillingReminderMutationVariables } from "../../../__generated__/CreateBillingReminderMutation";
import { CREATE_BILLING_REMINDER } from "../billing-reminders.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: DeepPartial<CreateBillingReminderInput>
    onCompleted: (id: number) => any
    onError: (message: string) => any
}

export const useCreateBillingReminder = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateBillingReminderInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateBillingReminderMutation, CreateBillingReminderMutationVariables>(CREATE_BILLING_REMINDER)

    const submit = async (variables: CreateBillingReminderMutationVariables) => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            console.log(data)

            if (data?.createBillingReminder?.ok && data?.createBillingReminder.id) {
                onCompleted(data?.createBillingReminder.id)
            } else {
                throw Error(data?.createBillingReminder?.error ?? "Error")
            }

        } catch ({ message }) {
            onError(message)
        }
    }
    return {
        form,
        mutate,
        loading,
        submit
    }
}

