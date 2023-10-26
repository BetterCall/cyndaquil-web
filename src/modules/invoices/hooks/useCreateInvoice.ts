import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CreateInvoiceInput } from "../../../__generated__/globalTypes";
import { CreateInvoiceMutation, CreateInvoiceMutationVariables } from "../../../__generated__/CreateInvoiceMutation";
import { CREATE_INVOICE } from "../invoices.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: DeepPartial<CreateInvoiceInput>
    onCompleted: (id: number) => any
    onError: (message: string) => any
}

export const useCreateInvoice = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateInvoiceInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateInvoiceMutation, CreateInvoiceMutationVariables>(CREATE_INVOICE)

    const submit = async (variables: CreateInvoiceMutationVariables) => {
        if (loading) return
        try {
            console.log("variables", variables)
            console.log("variables", variables)
            console.log("variables", variables)
            console.log("variables", variables)
            console.log("variables", variables)
            console.log("variables", variables)
            console.log("variables", variables)

            const { data } = await mutate({
                variables
            })

            console.log(data)

            if (data?.createInvoice?.ok && data?.createInvoice.id) {
                onCompleted(data?.createInvoice.id)
            } else {
                throw Error(data?.createInvoice?.error ?? "Error")
            }

        } catch ({ message }) {
            onError(message)
        }
    }
    return {
        form,
        mutate,
        loading,
        submit
    }
}

