import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CREATE_EMPLACEMENT } from "../emplacements.queries";
import { CreateEmplacementMutation, CreateEmplacementMutationVariables } from "../../../__generated__/CreateEmplacementMutation";
import { CreateEmplacementInput } from "../../../__generated__/globalTypes";
import { parseParams } from "../../../helpers/clean-object";



interface IProps {
    defaultValues: DeepPartial<CreateEmplacementInput>
    onCompleted: (id: number) => any
    onError: (message: string) => any
}


export const useCreateEmplacement = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateEmplacementInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateEmplacementMutation, CreateEmplacementMutationVariables>(CREATE_EMPLACEMENT)

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

            if (data?.createEmplacement?.ok && data?.createEmplacement?.id) {
                onCompleted(data?.createEmplacement?.id)

            } else {
                throw Error(data?.createEmplacement?.error ?? "Error")
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

