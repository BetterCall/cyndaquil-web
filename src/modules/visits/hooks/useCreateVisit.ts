import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";

import { CREATE_VISIT } from "../visits.queries";
import { parseParams } from "../../../helpers/clean-object";

import { CreateVisitInput } from "../../../__generated__/globalTypes";
import {
    CreateVisitMutation,
    CreateVisitMutationVariables
} from "../../../__generated__/CreateVisitMutation";

interface IProps {
    defaultValues: DeepPartial<CreateVisitInput>
    onCompleted: () => any
}

export const useCreateVisit = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateVisitInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateVisitMutation,
        CreateVisitMutationVariables
    >(CREATE_VISIT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createVisit?.ok) {
                console.log('ok done')
                onCompleted()
            } else {
                throw Error(data?.createVisit?.error ?? "Error")
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

