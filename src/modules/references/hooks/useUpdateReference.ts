import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_REFERENCE } from "../references.queries";

import { parseParams } from "../../../helpers/clean-object";

import { UpdateReferenceInput } from "../../../__generated__/globalTypes";
import {
    UpdateReferenceMutation,
    UpdateReferenceMutationVariables
} from "../../../__generated__/UpdateReferenceMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateReference = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateReferenceInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<
        UpdateReferenceMutation,
        UpdateReferenceMutationVariables
    >(UPDATE_REFERENCE)

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

            if (data?.updateReference?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateReference?.error ?? "Error")
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

