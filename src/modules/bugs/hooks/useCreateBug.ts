import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateBugInput, } from "../../../__generated__/globalTypes";
import { CreateBugMutation, CreateBugMutationVariables } from "../../../__generated__/CreateBugMutation";
import { CREATE_BUG } from "../bugs.queries";


interface IProps {
    defaultValues: CreateBugInput
    onCompleted: () => any
}

export const useCreateBug = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateBugInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateBugMutation, CreateBugMutationVariables>(CREATE_BUG)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input
                }
            })

            if (data?.createBug?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createBug?.error ?? "Error")
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

