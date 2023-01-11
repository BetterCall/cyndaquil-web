import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";

import { CREATE_TAXE } from "../taxes.queries";
import { parseParams } from "../../../helpers/clean-object";

import { CreateTaxeInput } from "../../../__generated__/globalTypes";
import { CreateTaxeMutation, CreateTaxeMutationVariables } from "../../../__generated__/CreateTaxeMutation";


interface IProps {
    defaultValues: DeepPartial<CreateTaxeInput>
    onCompleted: () => any
}

export const useCreateTaxe = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateTaxeInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateTaxeMutation,
        CreateTaxeMutationVariables
    >(CREATE_TAXE)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createTaxe?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createTaxe?.error ?? "Error")
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

