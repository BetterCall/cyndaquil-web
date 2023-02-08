import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";

import { GENERATE_FROM_CONTRACT } from "../work-orders.queries";
import { parseParams } from "../../../helpers/clean-object";

import { GenerateFromContractInput } from "../../../__generated__/globalTypes";
import {
    GenerateFromContractMutation,
    GenerateFromContractMutationVariables
} from "../../../__generated__/GenerateFromContractMutation";
import { toast } from "react-toastify";


interface IProps {
    defaultValues: GenerateFromContractInput
    onCompleted: (id: number) => any
}

export const useGenerateFromContract = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<GenerateFromContractInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        GenerateFromContractMutation,
        GenerateFromContractMutationVariables
    >(GENERATE_FROM_CONTRACT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.generateFromContract?.ok) {
                console.log('ok done')
                onCompleted(data?.generateFromContract?.id!)
            } else {
                throw Error(data?.generateFromContract?.error ?? "Error")
            }

        } catch (error) {
            toast.error("Impossible de générer le bon d'intervention")
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

