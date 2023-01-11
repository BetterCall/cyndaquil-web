import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateBenefitInput, } from "../../../__generated__/globalTypes";
import { UPDATE_BENEFIT } from "../benefits.queries";
import { UpdateBenefitMutation, UpdateBenefitMutationVariables } from "../../../__generated__/UpdateBenefitMutation";


interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateBenefit = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateBenefitInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateBenefitMutation, UpdateBenefitMutationVariables>(UPDATE_BENEFIT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    id,
                    input: {
                        ...input,
                        price: parseFloat((input.price + "").replace(",", ".")),
                    },
                },
            });

            if (data?.updateBenefit?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateBenefit?.error ?? "Error")
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

