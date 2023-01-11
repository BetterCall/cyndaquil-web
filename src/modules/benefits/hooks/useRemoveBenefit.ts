import { useMutation } from "@apollo/client";
import { REMOVE_BENEFIT } from "../benefits.queries";
import { RemoveBenefitMutation, RemoveBenefitMutationVariables } from "../../../__generated__/RemoveBenefitMutation";


interface IProps {
    id: number,
    onCompleted: () => any
}

export const useRemoveBenefit = ({ id, onCompleted }: IProps) => {

    const [mutate, { loading }] = useMutation<RemoveBenefitMutation, RemoveBenefitMutationVariables>(REMOVE_BENEFIT)

    const submit = async () => {
        if (loading) return
        try {

            const { data } = await mutate({
                variables: {
                    id,
                },
            });

            if (data?.removeBenefit?.ok) {
                onCompleted()
            } else {
                throw Error(data?.removeBenefit?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        mutate,
        loading,
        submit
    }

}

