import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateControlInput } from "../../../__generated__/globalTypes";
import { UPDATE_BUG } from "../controls.queries";
import { UpdateControlMutation, UpdateControlMutationVariables } from "../../../__generated__/UpdateControlMutation";


interface IProps {
    id: number,
    onCompleted: () => any
    onError: (message: string) => any
}

export const useUpdateControl = ({ id, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateControlInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateControlMutation, UpdateControlMutationVariables>(UPDATE_BUG)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    id,
                    input
                },
            });

            if (data?.updateControl?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateControl?.error ?? "Error")
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

