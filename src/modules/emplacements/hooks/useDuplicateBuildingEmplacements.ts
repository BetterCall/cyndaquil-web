import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { DUPLICATE_BUILDING_EMPLACEMENTS } from "../emplacements.queries";
import { DuplicateBuildingEmplacementsInput } from "../../../__generated__/globalTypes";
import { parseParams } from "../../../helpers/clean-object";
import { DuplicateBuildingEmplacementsMutation, DuplicateBuildingEmplacementsMutationVariables } from "../../../__generated__/DuplicateBuildingEmplacementsMutation";



interface IProps {
    defaultValues: DeepPartial<DuplicateBuildingEmplacementsInput>
    onCompleted: () => any
    onError: (message: string) => any
}


export const useDuplicateBuildingEmplacements = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<DuplicateBuildingEmplacementsInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        DuplicateBuildingEmplacementsMutation,
        DuplicateBuildingEmplacementsMutationVariables
    >(DUPLICATE_BUILDING_EMPLACEMENTS)

    const submit = async () => {
        if (loading) return
        try {
            const input = form.getValues()

            console.log(' ionput', parseParams(input))
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.duplicateBuildingEmplacements?.ok) {
                onCompleted()

            } else {
                throw Error(data?.duplicateBuildingEmplacements?.error ?? "Error")
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

