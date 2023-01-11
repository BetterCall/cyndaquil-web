import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateCallInput } from "../../../__generated__/globalTypes";
import { CreateCallMutation, CreateCallMutationVariables } from "../../../__generated__/CreateCallMutation";
import { CREATE_CALL } from "../calls.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: CreateCallInput
    onCompleted: () => any
}

export const useCreateCall = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateCallInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateCallMutation, CreateCallMutationVariables>(CREATE_CALL)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createCall?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createCall?.error ?? "Error")
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

