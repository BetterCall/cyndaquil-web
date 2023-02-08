import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";

import { CREATE_TRANSFER } from "../transfers.queries";
import { parseParams } from "../../../helpers/clean-object";

import { CreateTransferInput } from "../../../__generated__/globalTypes";
import {
    CreateTransferMutation,
    CreateTransferMutationVariables
} from "../../../__generated__/CreateTransferMutation";

interface IProps {
    defaultValues: DeepPartial<CreateTransferInput>
    onCompleted: () => any
}

export const useCreateTransfer = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateTransferInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateTransferMutation,
        CreateTransferMutationVariables
    >(CREATE_TRANSFER)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })
            if (data?.createTransfer?.ok) {
                console.log('ok done')
                onCompleted()
            } else {
                throw Error(data?.createTransfer?.error ?? "Error")
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

