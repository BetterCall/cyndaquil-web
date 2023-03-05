import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateContactCategoryInput } from "../../../__generated__/globalTypes";

import {
    CreateContactCategoryMutation,
    CreateContactCategoryMutationVariables
} from "../../../__generated__/CreateContactCategoryMutation";

import { CREATE_CONTACT_CATEGORY } from "../contact-categories.queries";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    defaultValues: CreateContactCategoryInput
    onCompleted: () => any,
    onError: (msg: string) => any
}

export const useCreateContactCategory = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateContactCategoryInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateContactCategoryMutation,
        CreateContactCategoryMutationVariables
    >(CREATE_CONTACT_CATEGORY)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createContactCategory?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createContactCategory?.error ?? "Error")
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

