import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateUploadCategoryInput } from "../../../__generated__/globalTypes";
import {
    CreateUploadCategoryMutation,
    CreateUploadCategoryMutationVariables
} from "../../../__generated__/CreateUploadCategoryMutation";

import { CREATE_UPLOAD_CATEGORY } from "../upload-categories.queries";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    defaultValues: CreateUploadCategoryInput
    onCompleted: () => any,
    onError: (msg: string) => any
}

export const useCreateUploadCategory = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateUploadCategoryInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateUploadCategoryMutation,
        CreateUploadCategoryMutationVariables
    >(CREATE_UPLOAD_CATEGORY)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createUploadCategory?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createUploadCategory?.error ?? "Error")
            }

        } catch ({ message }) {
            console.log(message)
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

