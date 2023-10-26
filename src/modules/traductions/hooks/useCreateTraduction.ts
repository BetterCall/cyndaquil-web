import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CreateTraductionInput } from "../../../__generated__/globalTypes";
import { CreateTraductionMutation, CreateTraductionMutationVariables } from "../../../__generated__/CreateTraductionMutation";
import { CREATE_TRADUCTION } from "../traductions.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: DeepPartial<CreateTraductionInput>
    onCompleted: () => any
}

export const useCreateTraduction = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateTraductionInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateTraductionMutation,
        CreateTraductionMutationVariables
    >(CREATE_TRADUCTION)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })
            if (data?.createTraduction?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createTraduction?.error ?? "Error")
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

