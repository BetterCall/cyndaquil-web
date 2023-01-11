import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_TAXE } from "../taxes.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateTaxeInput } from "../../../__generated__/globalTypes";
import {
    UpdateTaxeMutation,
    UpdateTaxeMutationVariables
} from "../../../__generated__/UpdateTaxeMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateTaxe = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateTaxeInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateTaxeMutation, UpdateTaxeMutationVariables>(UPDATE_TAXE)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.updateTaxe?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateTaxe?.error ?? "Error")
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

