import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateDemandInput } from "../../../__generated__/globalTypes";
import { CreateDemandMutation, CreateDemandMutationVariables } from "../../../__generated__/CreateDemandMutation";
import { CREATE_DEMAND } from "../demands.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: CreateDemandInput
    onCompleted: () => any
}

export const useCreateDemand = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateDemandInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateDemandMutation, CreateDemandMutationVariables>(CREATE_DEMAND)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createDemand?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createDemand?.error ?? "Error")
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

