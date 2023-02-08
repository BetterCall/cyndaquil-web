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
    onCompleted: () => any
}

export const useCreateWorkOrder = ({ defaultValues, onCompleted }: IProps) => {

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
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createWorkOrder?.ok) {
                console.log('ok done')
                onCompleted()
            } else {
                throw Error(data?.createWorkOrder?.error ?? "Error")
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

