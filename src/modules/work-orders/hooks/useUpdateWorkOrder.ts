import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_WORK_ORDER } from "../work-orders.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateWorkOrderInput } from "../../../__generated__/globalTypes";
import {
    UpdateWorkOrderMutation,
    UpdateWorkOrderMutationVariables
} from "../../../__generated__/UpdateWorkOrderMutation";

interface IProps {
    id: number,
    onCompleted: () => any
    onError: (message: string) => any
}

export const useUpdateWorkOrder = ({ id, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateWorkOrderInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateWorkOrderMutation, UpdateWorkOrderMutationVariables>(UPDATE_WORK_ORDER)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()

            console.log({ input: parseParams(input) })
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.updateWorkOrder?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateWorkOrder?.error ?? "Error")
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

