import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateEmplacementInput } from "../../../__generated__/globalTypes";
import { UPDATE_EMPLACEMENT } from "../emplacements.queries";
import { parseParams } from "../../../helpers/clean-object";
import { UpdateEmplacementMutation, UpdateEmplacementMutationVariables } from "../../../__generated__/UpdateEmplacementMutation";


interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateEmplacement = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateEmplacementInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateEmplacementMutation, UpdateEmplacementMutationVariables>(UPDATE_EMPLACEMENT)

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

            if (data?.updateEmplacement?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateEmplacement?.error ?? "Error")
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

