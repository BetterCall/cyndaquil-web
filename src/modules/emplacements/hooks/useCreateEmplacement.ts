import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CREATE_EMPLACEMENT } from "../emplacements.queries";
import { CreateEmplacementMutation, CreateEmplacementMutationVariables } from "../../../__generated__/CreateEmplacementMutation";
import { CreateEmplacementInput } from "../../../__generated__/globalTypes";
import { parseParams } from "../../../helpers/clean-object";



interface IProps {
    defaultValues: DeepPartial<CreateEmplacementInput>
    onCompleted: () => any
}


export const useCreateEmplacement = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateEmplacementInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateEmplacementMutation, CreateEmplacementMutationVariables>(CREATE_EMPLACEMENT)

    const submit = async () => {
        if (loading) return
        try {
            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createEmplacement?.ok) {
                alert('ok')
            } else {
                throw Error(data?.createEmplacement?.error ?? "Error")
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

