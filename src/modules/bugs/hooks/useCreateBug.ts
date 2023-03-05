import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateBugInput, } from "../../../__generated__/globalTypes";
import { CreateBugMutation, CreateBugMutationVariables } from "../../../__generated__/CreateBugMutation";
import { CREATE_BUG } from "../bugs.queries";

interface IProps {
    onCompleted: (id: number) => any
    onError: (msg) => any
}

export const useCreateBug = ({ onCompleted, onError }: IProps) => {

    const form = useForm<CreateBugInput>({
        mode: "all",
        defaultValues: {
            critical: false,
        }
    })
    const [mutate, { loading }] = useMutation<CreateBugMutation, CreateBugMutationVariables>(CREATE_BUG)

    const submit = async () => {
        if (loading) return
        try {
            console.log('submit', form.formState.isValid)

            const input = form.getValues()
            console.log({ input })
            const { data } = await mutate({
                variables: {
                    input
                }
            })

            if (data?.createBug?.ok && data?.createBug?.id) {
                onCompleted(data?.createBug?.id)
            } else {
                throw Error(data?.createBug?.error ?? "Error")
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

