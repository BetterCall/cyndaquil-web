import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateDemandInput, DemandType } from "../../../__generated__/globalTypes";
import { CreateDemandMutation, CreateDemandMutationVariables } from "../../../__generated__/CreateDemandMutation";
import { CREATE_DEMAND } from "../demands.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues?: CreateDemandInput
    onCompleted: () => any
    onError: (msg: string) => any
}

export const useCreateDemand = ({ defaultValues = {
    type: DemandType.Call,
    object: "",
    message: " "

}, onCompleted, onError }: IProps) => {

    const form = useForm<CreateDemandInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateDemandMutation, CreateDemandMutationVariables>(CREATE_DEMAND)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            console.log({ input: parseParams(input) })
            const { data, errors } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createDemand?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createDemand?.error ?? "Error")
            }

        } catch ({ message }) {
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

