import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_WORK_ORDER_ROW } from "../work-order-rows.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateWorkOrderRowInput } from "../../../__generated__/globalTypes";
import {
    UpdateWorkOrderRowMutation,
    UpdateWorkOrderRowMutationVariables
} from "../../../__generated__/UpdateWorkOrderRowMutation";

interface IProps {
    id: number,
    defaultValues: any,
    onCompleted: () => any,
    onError: (message: string) => any
}

export const useUpdateWorkOrderRow = ({ id, defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateWorkOrderRowInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<UpdateWorkOrderRowMutation, UpdateWorkOrderRowMutationVariables>(UPDATE_WORK_ORDER_ROW)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            console.log('input', parseParams(input))

            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });



            if (data?.updateWorkOrderRow?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateWorkOrderRow?.error ?? "Error")
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

