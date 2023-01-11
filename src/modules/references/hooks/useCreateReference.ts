import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";

import { CREATE_REFERENCE } from "../references.queries";

import { parseParams } from "../../../helpers/clean-object";

import { CreateReferenceInput } from "../../../__generated__/globalTypes";
import {
    CreateReferenceMutation,
    CreateReferenceMutationVariables
} from "../../../__generated__/CreateReferenceMutation";

interface IProps {
    defaultValues: DeepPartial<CreateReferenceInput>
    onCompleted: () => any
}

export const useCreateReference = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateReferenceInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateReferenceMutation,
        CreateReferenceMutationVariables
    >(CREATE_REFERENCE)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createReference?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createReference?.error ?? "Error")
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

