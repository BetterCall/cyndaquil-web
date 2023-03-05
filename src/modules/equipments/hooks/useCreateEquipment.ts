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
    onCompleted: (id: number) => any
    onError: (message: string) => any
}

export const useCreateEquipment = ({ defaultValues, onCompleted, onError }: IProps) => {

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
            console.log('input', input)
            console.log('input', parseParams(input))
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })
            if (data?.createEquipment?.ok && data?.createEquipment.id) {
                onCompleted(data?.createEquipment.id)
            } else {
                throw Error(data?.createEquipment?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
            onError(error.message)
        }
    }
    return {
        form,
        mutate,
        loading,
        submit
    }
}

