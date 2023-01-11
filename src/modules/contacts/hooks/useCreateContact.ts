import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateContactInput } from "../../../__generated__/globalTypes";
import { CreateContactMutation, CreateContactMutationVariables } from "../../../__generated__/CreateContactMutation";
import { CREATE_CONTACT } from "../contacts.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: CreateContactInput
    onCompleted: () => any
}

export const useCreateContact = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateContactInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateContactMutation, CreateContactMutationVariables>(CREATE_CONTACT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createContact?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createContact?.error ?? "Error")
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

