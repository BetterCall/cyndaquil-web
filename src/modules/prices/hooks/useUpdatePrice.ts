import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_PRICE_RULE } from "../prices.queries";

import { parseParams } from "../../../helpers/clean-object";

import { UpdatePriceRuleInput } from "../../../__generated__/globalTypes";
import {
    UpdatePriceRuleMutation,
    UpdatePriceRuleMutationVariables
} from "../../../__generated__/UpdatePriceRuleMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdatePriceRule = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdatePriceRuleInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<
        UpdatePriceRuleMutation,
        UpdatePriceRuleMutationVariables
    >(UPDATE_PRICE_RULE)

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

            if (data?.updatePriceRule?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updatePriceRule?.error ?? "Error")
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

