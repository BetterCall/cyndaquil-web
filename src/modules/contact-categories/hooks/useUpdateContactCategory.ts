import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateContactCategoryInput } from "../../../__generated__/globalTypes";
import { UPDATE_CONTACT_CATEGORY } from "../contact-categories.queries";
import { parseParams } from "../../../helpers/clean-object";
import { UpdateContactCategoryMutation, UpdateContactCategoryMutationVariables } from "../../../__generated__/UpdateContactCategoryMutation";

interface IProps {
    id: number,
    onCompleted: () => any,
    onError: (msg: string) => any

}

export const useUpdateContactCategory = ({ id, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateContactCategoryInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<
        UpdateContactCategoryMutation,
        UpdateContactCategoryMutationVariables
    >(UPDATE_CONTACT_CATEGORY)

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

            if (data?.updateContactCategory?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateContactCategory?.error ?? "Error")
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

