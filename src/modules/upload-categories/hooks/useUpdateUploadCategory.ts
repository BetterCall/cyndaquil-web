import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateUploadCategoryInput } from "../../../__generated__/globalTypes";
import { UPDATE_UPLOAD_CATEGORY } from "../upload-categories.queries";
import { parseParams } from "../../../helpers/clean-object";
import { UpdateUploadCategoryMutation, UpdateUploadCategoryMutationVariables } from "../../../__generated__/UpdateUploadCategoryMutation";

interface IProps {
    id: number,
    onCompleted: () => any,
    onError: (msg: string) => any

}

export const useUpdateUploadCategory = ({ id, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateUploadCategoryInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<
        UpdateUploadCategoryMutation,
        UpdateUploadCategoryMutationVariables
    >(UPDATE_UPLOAD_CATEGORY)

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

            if (data?.updateUploadCategory?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateUploadCategory?.error ?? "Error")
            }

        } catch ({ message }) {
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

