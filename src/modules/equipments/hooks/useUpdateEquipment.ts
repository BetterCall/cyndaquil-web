import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateEquipmentInput } from "../../../__generated__/globalTypes";
import { UPDATE_EQUIPMENT } from "../equipments.queries";
import { parseParams } from "../../../helpers/clean-object";
import { UpdateEquipmentMutation, UpdateEquipmentMutationVariables } from "../../../__generated__/UpdateEquipmentMutation";

interface IProps {
    id: number,
    onCompleted: () => any
    onError: (message: string) => any
}

export const useUpdateEquipment = ({ id, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateEquipmentInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<
        UpdateEquipmentMutation,
        UpdateEquipmentMutationVariables
    >(UPDATE_EQUIPMENT)

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

            if (data?.updateEquipment?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateEquipment?.error ?? "Error")
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

