import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_SUPPLIER } from "../suppliers.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateSupplierInput } from "../../../__generated__/globalTypes";
import {
    UpdateSupplierMutation,
    UpdateSupplierMutationVariables
} from "../../../__generated__/UpdateSupplierMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateSupplier = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateSupplierInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateSupplierMutation, UpdateSupplierMutationVariables>(UPDATE_SUPPLIER)

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

            if (data?.updateSupplier?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateSupplier?.error ?? "Error")
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

