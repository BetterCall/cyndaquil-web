import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";

import { CREATE_WORK_ORDER } from "../work-orders.queries";
import { parseParams } from "../../../helpers/clean-object";

import {
    CreateWorkOrderMutation,
    CreateWorkOrderMutationVariables
} from "../../../__generated__/CreateWorkOrderMutation";
import { CreateWorkOrderInput } from "../../../__generated__/globalTypes";


interface IProps {
    defaultValues: DeepPartial<CreateWorkOrderInput>
    onCompleted: (id: number) => any
    onError: (msg: string) => any
}

export const useCreateWorkOrder = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateWorkOrderInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateWorkOrderMutation,
        CreateWorkOrderMutationVariables
    >(CREATE_WORK_ORDER)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            console.log({ input: parseParams(input) })
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createWorkOrder?.ok && data?.createWorkOrder.id) {
                onCompleted(data?.createWorkOrder.id)
            } else {
                throw Error(data?.createWorkOrder?.error ?? "Error")
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

