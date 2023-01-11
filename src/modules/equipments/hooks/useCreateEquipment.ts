import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateEquipmentInput } from "../../../__generated__/globalTypes";

import {
    CreateEquipmentMutation,
    CreateEquipmentMutationVariables
} from "../../../__generated__/CreateEquipmentMutation";

import { CREATE_EQUIPMENT } from "../equipments.queries";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    defaultValues: CreateEquipmentInput
    onCompleted: () => any
}

export const useCreateEquipment = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateEquipmentInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateEquipmentMutation,
        CreateEquipmentMutationVariables
    >(CREATE_EQUIPMENT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createEquipment?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createEquipment?.error ?? "Error")
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

