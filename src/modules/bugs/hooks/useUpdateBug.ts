import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateBugInput } from "../../../__generated__/globalTypes";
import { UPDATE_BUG } from "../bugs.queries";
import { UpdateBugMutation, UpdateBugMutationVariables } from "../../../__generated__/UpdateBugMutation";


interface IProps {
    id: number,
    onCompleted: () => any
    onError: (message: string) => any
}

export const useUpdateBug = ({ id, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateBugInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateBugMutation, UpdateBugMutationVariables>(UPDATE_BUG)

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

            if (data?.updateBug?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateBug?.error ?? "Error")
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

