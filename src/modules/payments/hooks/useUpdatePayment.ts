import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdatePaymentInput } from "../../../__generated__/globalTypes";
import { UPDATE_PAYMENT } from "../payments.queries";
import { UpdatePaymentMutation, UpdatePaymentMutationVariables } from "../../../__generated__/UpdatePaymentMutation";
import { parseParams } from "../../../helpers/clean-object";
import { toast } from "react-toastify";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdatePayment = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdatePaymentInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdatePaymentMutation, UpdatePaymentMutationVariables>(UPDATE_PAYMENT)

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

            if (data?.updatePayment?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updatePayment?.error ?? "Error")
                toast.error("Une Erreur est survenue lors de la modification du paiement")
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

