import { useMutation } from "@apollo/client";
import { GENERATE_FROM_CONTRACT } from "../work-orders.queries";
import {
    GenerateFromContractMutation,
    GenerateFromContractMutationVariables
} from "../../../__generated__/GenerateFromContractMutation";
import { GenerateFromContractInput, WorkOrderType } from "../../../__generated__/globalTypes";
import { useForm } from "react-hook-form";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    contractId: number
    onCompleted: (id: number) => any
    onError: (error: string) => any
}

export const useGenerateFromContract = ({ contractId, onCompleted, onError }: IProps) => {
    const [mutate, { loading }] = useMutation<
        GenerateFromContractMutation,
        GenerateFromContractMutationVariables
    >(GENERATE_FROM_CONTRACT)

    const form = useForm<GenerateFromContractInput>({
        mode: "all",
        defaultValues: {
            contractId,
            type: WorkOrderType.Contract
        }
    })

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

        } catch ({ message }) {
            console.log({ message })
            onError(message)
        }
    }
    return {
        mutate,
        loading,
        submit,
        form
    }
}

