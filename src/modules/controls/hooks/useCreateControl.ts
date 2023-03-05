import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateControlInput, } from "../../../__generated__/globalTypes";
import { CreateControlMutation, CreateControlMutationVariables } from "../../../__generated__/CreateControlMutation";
import { CREATE_CONTROL } from "../controls.queries";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    defaultValues: CreateControlInput
    onCompleted: (id: number) => any
    onError: (msg) => any
}

export const useCreateControl = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateControlInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateControlMutation, CreateControlMutationVariables>(CREATE_CONTROL)

    const submit = async () => {
        if (loading) return
        try {
            console.log('submit', form.formState.isValid)

            const input = form.getValues()
            console.log('input', input)
            console.log('input parsed ', parseParams(input))
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createControl?.ok && data?.createControl?.id) {
                onCompleted(data?.createControl?.id)
            } else {
                throw Error(data?.createControl?.error ?? "Error")
            }

        } catch ({ message }) {
            console.log(message)
            onError(message)
        }
    }

    return {
        form,
        mutate,
        loading,
        submit
    }

}

