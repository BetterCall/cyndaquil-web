import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { parseParams } from "../../../helpers/clean-object";

import { CREATE_PRICE_RULE } from "../prices.queries";
import { CreatePriceRuleInput } from "../../../__generated__/globalTypes";
import {
    CreatePriceRuleMutation,
    CreatePriceRuleMutationVariables
} from "../../../__generated__/CreatePriceRuleMutation";

interface IProps {
    defaultValues: DeepPartial<CreatePriceRuleInput>
    onCompleted: (id: number) => any
    onError: (error: string) => any
}

export const useCreatePrice = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreatePriceRuleInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreatePriceRuleMutation,
        CreatePriceRuleMutationVariables
    >(CREATE_PRICE_RULE)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            console.log({ input: parseParams(input) })
            const { data, errors } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })
            console.log(data)
            console.log(errors)

            if (data?.createPriceRule?.ok && data?.createPriceRule?.id) {
                onCompleted(data?.createPriceRule?.id)
            } else {
                throw Error(data?.createPriceRule?.error ?? "Error")
            }

        } catch ({ message }) {
            onError(message)
        }
    }
    return {
        form,
        mutate,
        loading,
        submit
    }
}

