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
}

export const useUpdateWorkOrder = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateWorkOrderInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateWorkOrderMutation, UpdateWorkOrderMutationVariables>(UPDATE_WORK_ORDER)

    const submit = async () => {
        if (loading) return
        try {

            console.log('input ')

            const input = form.getValues()
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
        }
    }

    return {
        form,
        mutate,
        loading,
        submit
    }
}

