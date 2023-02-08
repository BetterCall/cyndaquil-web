import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CreatePaymentInput } from "../../../__generated__/globalTypes";
import { CreatePaymentMutation, CreatePaymentMutationVariables } from "../../../__generated__/CreatePaymentMutation";
import { CREATE_PAYMENT } from "../payments.queries";
import { parseParams } from "../../../helpers/clean-object";
import { toast } from "react-toastify";


interface IProps {
    defaultValues: DeepPartial<CreatePaymentInput>
    onCompleted: () => any
}

export const useCreatePayment = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreatePaymentInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CREATE_PAYMENT)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createPayment?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createPayment?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
            toast.error("Une Erreur est survenue a la saisie du paiement")
        }
    }
    return {
        form,
        mutate,
        loading,
        submit
    }
}

