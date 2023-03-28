import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateCustomerInput } from "../../../__generated__/globalTypes";
import { UPDATE_CUSTOMER } from "../customers.queries";
import { parseParams } from "../../../helpers/clean-object";
import { UpdateCustomerMutation, UpdateCustomerMutationVariables } from "../../../__generated__/UpdateCustomerMutation";

interface IProps {
    id: number,
    onCompleted: () => any
    onError: (msg: string) => any
}

export const useUpdateCustomer = ({ id, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateCustomerInput>({
        mode: "all",
    })

    const [mutate, { loading }] = useMutation<
        UpdateCustomerMutation,
        UpdateCustomerMutationVariables
    >(UPDATE_CUSTOMER)

    const submit = async () => {
        if (loading) return
        try {
            const input = form.getValues()
            console.log('input update', parseParams(input))
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.updateCustomer?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateCustomer?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
            onError(error.message)
        }
    }

    return {
        form,
        mutate,
        loading,
        submit
    }
}

