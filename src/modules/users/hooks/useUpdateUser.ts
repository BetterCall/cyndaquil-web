import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_USER } from "../user.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateUserInput } from "../../../__generated__/globalTypes";
import {
    UpdateUserMutation,
    UpdateUserMutationVariables
} from "../../../__generated__/UpdateUserMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}


interface UpdateUserInputExtended extends UpdateUserInput {
    confirmation: string
}

export const useUpdateUser = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateUserInputExtended>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UPDATE_USER)

    const submit = async () => {
        if (loading) return
        try {

            const { confirmation, ...input } = form.getValues()
            if (input.password && confirmation !== input.password) {
                throw new Error("Les mot de passe ne correspondent pas")
            }
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.updateUser?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateUser?.error ?? "Error")
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

