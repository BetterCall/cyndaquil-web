import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateBenefitInput, } from "../../../__generated__/globalTypes";
import { CreateBenefitMutation, CreateBenefitMutationVariables } from "../../../__generated__/CreateBenefitMutation";
import { CREATE_BENEFIT } from "../benefits.queries";


interface IProps {
    defaultValues: CreateBenefitInput
    onCompleted: () => any
}

export const useCreateBenefit = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateBenefitInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateBenefitMutation, CreateBenefitMutationVariables>(CREATE_BENEFIT)

    const submit = async () => {
        if (loading) return
        try {

            const { taxeId, categoryId, price, ...input } = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: {
                        taxeId: parseInt(taxeId + ""),
                        categoryId: parseInt(categoryId + ""),
                        price: parseFloat((price + "").replace(",", ".")),
                        ...input
                    }
                }
            })

            if (data?.createBenefit?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createBenefit?.error ?? "Error")
            }

        } catch (error) {
        }
    }

    return {
        form,
        mutate,
        loading,
        submit
    }

}

