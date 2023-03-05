import { useMutation } from "@apollo/client";

import { GENERATE_FROM_UNFINISHED_WORK_ORDER } from "../work-orders.queries";

import {
    GenerateFromUnfinishedWorkOrderMutation,
    GenerateFromUnfinishedWorkOrderMutationVariables
} from "../../../__generated__/GenerateFromUnfinishedWorkOrderMutation";


interface IProps {
    workOrderId: number
    onCompleted: (id: number) => any,
    onError: (error: string) => any
}

export const useGenerateFromUnfinishedWorkOrder = ({ workOrderId, onCompleted, onError }: IProps) => {

    const [mutate, { loading }] = useMutation<
        GenerateFromUnfinishedWorkOrderMutation,
        GenerateFromUnfinishedWorkOrderMutationVariables
    >(GENERATE_FROM_UNFINISHED_WORK_ORDER)

    const submit = async () => {
        if (loading) return
        try {
            const { data } = await mutate({
                variables: {
                    input: { workOrderId }
                }
            })

            if (data?.generateFromUnfinishedWorkOrder?.ok) {
                console.log('ok done')
                onCompleted(data?.generateFromUnfinishedWorkOrder?.id!)
            } else {
                throw Error(data?.generateFromUnfinishedWorkOrder?.error ?? "Error")
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

