import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { parseParams } from "../../../helpers/clean-object";
import {
    CreateCustomerCategoryMutation,
    CreateCustomerCategoryMutationVariables
} from "../../../__generated__/CreateCustomerCategoryMutation";
import { CreateCustomerCategoryInput } from "../../../__generated__/globalTypes";
import { CREATE_CUSTOMER_CATEGORY } from "../customer-categories.queries";

interface IProps {
    defaultValues: CreateCustomerCategoryInput
    onCompleted: () => any
}

export const useCreateCustomerCategory = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateCustomerCategoryInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateCustomerCategoryMutation,
        CreateCustomerCategoryMutationVariables
    >(CREATE_CUSTOMER_CATEGORY)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createCustomerCategory?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createCustomerCategory?.error ?? "Error")
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

