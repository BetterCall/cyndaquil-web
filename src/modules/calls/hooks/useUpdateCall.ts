import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateCallInput } from "../../../__generated__/globalTypes";
import { UPDATE_CALL } from "../calls.queries";
import { UpdateCallMutation, UpdateCallMutationVariables } from "../../../__generated__/UpdateCallMutation";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateCall = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateCallInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateCallMutation, UpdateCallMutationVariables>(UPDATE_CALL)

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

            if (data?.updateCall?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateCall?.error ?? "Error")
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

