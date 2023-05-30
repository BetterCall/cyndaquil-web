import { useMutation, useApolloClient, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateEmplacementInput } from "../../../__generated__/globalTypes";
import { UPDATE_EMPLACEMENT } from "../emplacements.queries";
import { parseParams } from "../../../helpers/clean-object";
import { UpdateEmplacementMutation, UpdateEmplacementMutationVariables } from "../../../__generated__/UpdateEmplacementMutation";


interface IProps {
    id: number,
    defaultValues?: any,
    onCompleted: any
    onError: (message: string) => any
}

export const useUpdateEmplacement = ({ id, defaultValues, onCompleted, onError }: IProps) => {
    const client = useApolloClient()
    const form = useForm<UpdateEmplacementInput>({
        defaultValues,
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateEmplacementMutation, UpdateEmplacementMutationVariables>(UPDATE_EMPLACEMENT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            console.log('input', input)
            console.log('input', parseParams(input))
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

