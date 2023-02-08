import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_VISIT } from "../visits.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateVisitInput } from "../../../__generated__/globalTypes";
import {
    UpdateVisitMutation,
    UpdateVisitMutationVariables
} from "../../../__generated__/UpdateVisitMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateVisit = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateVisitInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateVisitMutation, UpdateVisitMutationVariables>(UPDATE_VISIT)

    const submit = async () => {
        if (loading) return
        try {

            console.log('input ')

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.updateVisit?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateVisit?.error ?? "Error")
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

