import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { parseParams } from "../../../helpers/clean-object";
import { CreateCustomerMutation, CreateCustomerMutationVariables } from "../../../__generated__/CreateCustomerMutation";
import { CreateCustomerInput } from "../../../__generated__/globalTypes";
import { CREATE_CUSTOMER } from "../customers.queries";

interface IProps {
    defaultValues: DeepPartial<CreateCustomerInput>
    onCompleted: (id: number) => any
    onError: (msg: string) => any
}

export const useCreateCustomer = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateCustomerInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateCustomerMutation,
        CreateCustomerMutationVariables
    >(CREATE_CUSTOMER)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            console.log({ input })
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createCustomer?.ok && data?.createCustomer?.id) {
                onCompleted(data?.createCustomer?.id)
            } else {
                throw Error(data?.createCustomer?.error ?? "Error")
            }

        } catch ({ message = "" }) {
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

