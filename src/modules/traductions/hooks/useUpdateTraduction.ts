import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_TRADUCTION } from "../traductions.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateTraductionInput } from "../../../__generated__/globalTypes";
import {
    UpdateTraductionMutation,
    UpdateTraductionMutationVariables
} from "../../../__generated__/UpdateTraductionMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateTraduction = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateTraductionInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateTraductionMutation, UpdateTraductionMutationVariables>(UPDATE_TRADUCTION)

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

            if (data?.updateTraduction?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateTraduction?.error ?? "Error")
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

