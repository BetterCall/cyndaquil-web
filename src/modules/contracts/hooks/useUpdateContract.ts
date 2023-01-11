import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateContractInput } from "../../../__generated__/globalTypes";
import { UPDATE_CONTRACT } from "../contracts.queries";
import { UpdateContractMutation, UpdateContractMutationVariables } from "../../../__generated__/UpdateContractMutation";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateContract = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateContractInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateContractMutation, UpdateContractMutationVariables>(UPDATE_CONTRACT)

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

            if (data?.updateContract?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateContract?.error ?? "Error")
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

