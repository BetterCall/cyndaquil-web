import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { RESOLVE_DEMAND } from "../demands.queries";
import { parseParams } from "../../../helpers/clean-object";

import { ResolveDemandInput } from "../../../__generated__/globalTypes";
import { ResolveDemandMutation, ResolveDemandMutationVariables } from "../../../__generated__/ResolveDemandMutation";

interface IProps {
    id: number,
    onCompleted: () => any,
    defaultValues?: ResolveDemandInput
}

export const useResolveDemand = ({ id, onCompleted, defaultValues = {
    treated: false,
    report: "",
} }: IProps) => {

    const form = useForm<ResolveDemandInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<ResolveDemandMutation, ResolveDemandMutationVariables>(RESOLVE_DEMAND)

    const submit = async () => {
        if (loading) return
        try {

            console.log('ID ', id)

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.resolveDemand?.ok) {
                onCompleted()
            } else {
                throw Error(data?.resolveDemand?.error ?? "Error")
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

