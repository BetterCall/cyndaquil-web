import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CreateContractInput } from "../../../__generated__/globalTypes";
import { CreateContractMutation, CreateContractMutationVariables } from "../../../__generated__/CreateContractMutation";
import { CREATE_CONTRACT } from "../contracts.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: DeepPartial<CreateContractInput>
    onCompleted: () => any
}

export const useCreateContract = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateContractInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateContractMutation, CreateContractMutationVariables>(CREATE_CONTRACT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createContract?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createContract?.error ?? "Error")
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

