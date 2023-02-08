import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_TRANSFER } from "../transfers.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateTransferInput } from "../../../__generated__/globalTypes";
import {
    UpdateTransferMutation,
    UpdateTransferMutationVariables
} from "../../../__generated__/UpdateTransferMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateTransfer = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateTransferInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateTransferMutation, UpdateTransferMutationVariables>(UPDATE_TRANSFER)

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

            if (data?.updateTransfer?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateTransfer?.error ?? "Error")
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

