import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateContactInput } from "../../../__generated__/globalTypes";
import { UPDATE_CONTACT } from "../contacts.queries";
import { UpdateContactMutation, UpdateContactMutationVariables } from "../../../__generated__/UpdateContactMutation";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateContact = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateContactInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateContactMutation, UpdateContactMutationVariables>(UPDATE_CONTACT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()

            console.log(input)
            console.log(parseParams(input))
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.updateContact?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateContact?.error ?? "Error")
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

