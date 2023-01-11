import { useMutation } from "@apollo/client";
import { DeepPartial, useForm } from "react-hook-form";
import { CreateSupplierInput } from "../../../__generated__/globalTypes";
import { CreateSupplierMutation, CreateSupplierMutationVariables } from "../../../__generated__/CreateSupplierMutation";
import { CREATE_SUPPLIER } from "../suppliers.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: DeepPartial<CreateSupplierInput>
    onCompleted: () => any
}

export const useCreateSupplier = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateSupplierInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateSupplierMutation, CreateSupplierMutationVariables>(CREATE_SUPPLIER)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createSupplier?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createSupplier?.error ?? "Error")
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

