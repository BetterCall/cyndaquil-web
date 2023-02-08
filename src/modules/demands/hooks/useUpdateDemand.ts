import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UPDATE_DEMAND } from "../demands.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateDemandInput } from "../../../__generated__/globalTypes";
import { UpdateDemandMutation, UpdateDemandMutationVariables } from "../../../__generated__/UpdateDemandMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateDemand = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateDemandInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateDemandMutation, UpdateDemandMutationVariables>(UPDATE_DEMAND)

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

            if (data?.updateDemand?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateDemand?.error ?? "Error")
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

