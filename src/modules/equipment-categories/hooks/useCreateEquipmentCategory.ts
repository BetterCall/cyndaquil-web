import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateEquipmentCategoryInput } from "../../../__generated__/globalTypes";

import {
    CreateEquipmentCategoryMutation,
    CreateEquipmentCategoryMutationVariables
} from "../../../__generated__/CreateEquipmentCategoryMutation";

import { CREATE_EQUIPMENT_CATEGORY } from "../equipment-categories.queries";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    defaultValues: CreateEquipmentCategoryInput
    onCompleted: () => any
}

export const useCreateEquipmentCategory = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateEquipmentCategoryInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateEquipmentCategoryMutation,
        CreateEquipmentCategoryMutationVariables
    >(CREATE_EQUIPMENT_CATEGORY)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createEquipmentCategory?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createEquipmentCategory?.error ?? "Error")
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

