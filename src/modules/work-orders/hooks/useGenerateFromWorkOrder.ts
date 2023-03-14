import { useMutation } from "@apollo/client";

import { GENERATE_FROM_WORK_ORDER } from "../work-orders.queries";

import {
    GenerateFromWorkOrderMutation,
    GenerateFromWorkOrderMutationVariables
} from "../../../__generated__/GenerateFromWorkOrderMutation";


interface IProps {
    workOrderId: number
    onCompleted: (id: number) => any,
    onError: (error: string) => any
}

export const useGenerateFromWorkOrder = ({ workOrderId, onCompleted, onError }: IProps) => {

    const [mutate, { loading }] = useMutation<
        GenerateFromWorkOrderMutation,
        GenerateFromWorkOrderMutationVariables
    >(GENERATE_FROM_WORK_ORDER)

    const submit = async () => {
        if (loading) return
        try {
            const { data } = await mutate({
                variables: {
                    input: { workOrderId }
                }
            })

            if (data?.generateFromWorkOrder?.ok) {
                console.log('ok done')
                onCompleted(data?.generateFromWorkOrder?.id!)
            } else {
                throw Error(data?.generateFromWorkOrder?.error ?? "Error")
            }

        } catch ({ message }) {
            onError(message)
        }
    }
    return {
        mutate,
        loading,
        submit
    }
}

