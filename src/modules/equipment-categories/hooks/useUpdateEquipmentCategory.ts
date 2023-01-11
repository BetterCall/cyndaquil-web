import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateEquipmentCategoryInput } from "../../../__generated__/globalTypes";
import { UPDATE_EQUIPMENT_CATEGORY } from "../equipment-categories.queries";
import { parseParams } from "../../../helpers/clean-object";
import { UpdateEquipmentCategoryMutation, UpdateEquipmentCategoryMutationVariables } from "../../../__generated__/UpdateEquipmentCategoryMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateEquipmentCategory = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateEquipmentCategoryInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<
        UpdateEquipmentCategoryMutation,
        UpdateEquipmentCategoryMutationVariables
    >(UPDATE_EQUIPMENT_CATEGORY)

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

            if (data?.updateEquipmentCategory?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateEquipmentCategory?.error ?? "Error")
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

