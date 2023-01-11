import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";

import { CREATE_USER } from "../user.queries";
import { parseParams } from "../../../helpers/clean-object";

import { CreateUserInput } from "../../../__generated__/globalTypes";
import {
    CreateUserMutation,
    CreateUserMutationVariables
} from "../../../__generated__/CreateUserMutation";


interface IProps {
    defaultValues: DeepPartial<CreateUserInput>
    onCompleted: () => any
}

interface CreateUserInputExtends extends CreateUserInput {
    confirmation: string
}

export const useCreateUser = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateUserInputExtends>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<
        CreateUserMutation,
        CreateUserMutationVariables
    >(CREATE_USER)

    const submit = async () => {
        if (loading) return
        try {

            const { confirmation, ...input } = form.getValues()

            console.log(input)
            if (input.password && confirmation !== input.password) {
                throw new Error('Les mots de passe ne correspondent pas')
            }
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createUser?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createUser?.error ?? "Error")
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

