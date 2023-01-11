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
    onCompleted: () => any
}

export const useCreatePrice = ({ defaultValues, onCompleted }: IProps) => {

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
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createPriceRule?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createPriceRule?.error ?? "Error")
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

