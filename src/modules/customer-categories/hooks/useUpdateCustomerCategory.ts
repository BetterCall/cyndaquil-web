import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { parseParams } from "../../../helpers/clean-object";

import { UPDATE_CUSTOMER_CATEGORY } from "../customer-categories.queries";
import { UpdateCustomerCategoryInput } from "../../../__generated__/globalTypes";
import {
    UpdateCustomerCategoryMutation,
    UpdateCustomerCategoryMutationVariables
} from "../../../__generated__/UpdateCustomerCategoryMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateCustomerCategory = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateCustomerCategoryInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<
        UpdateCustomerCategoryMutation,
        UpdateCustomerCategoryMutationVariables
    >(UPDATE_CUSTOMER_CATEGORY)

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

            if (data?.updateCustomerCategory?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateCustomerCategory?.error ?? "Error")
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

