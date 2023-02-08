import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateInvoiceInput } from "../../../__generated__/globalTypes";
import { UPDATE_INVOICE } from "../invoices.queries";
import { UpdateInvoiceMutation, UpdateInvoiceMutationVariables } from "../../../__generated__/UpdateInvoiceMutation";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateInvoice = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateInvoiceInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(UPDATE_INVOICE)

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

            if (data?.updateInvoice?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateInvoice?.error ?? "Error")
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

