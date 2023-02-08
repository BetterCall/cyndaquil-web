import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CreateInvoiceInput } from "../../../__generated__/globalTypes";
import { CreateInvoiceMutation, CreateInvoiceMutationVariables } from "../../../__generated__/CreateInvoiceMutation";
import { CREATE_INVOICE } from "../invoices.queries";
import { parseParams } from "../../../helpers/clean-object";
import { toast } from "react-toastify";


interface IProps {
    defaultValues: DeepPartial<CreateInvoiceInput>
    onCompleted: (id: number) => any
}

export const useCreateInvoice = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateInvoiceInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateInvoiceMutation, CreateInvoiceMutationVariables>(CREATE_INVOICE)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            console.log(data)

            if (data?.createInvoice?.ok && data?.createInvoice.id) {
                onCompleted(data?.createInvoice.id)
            } else {
                throw Error(data?.createInvoice?.error ?? "Error")
            }

        } catch (error) {
            toast.error('Une erreur est survenue lors de la création de la facture')
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

