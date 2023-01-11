import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateBrandInput, } from "../../../__generated__/globalTypes";
import { CreateBrandMutation, CreateBrandMutationVariables } from "../../../__generated__/CreateBrandMutation";
import { CREATE_BRAND } from "../brands.queries";


interface IProps {
    defaultValues: CreateBrandInput
    onCompleted: () => any
}

export const useCreateBrand = ({ defaultValues, onCompleted }: IProps) => {

    const form = useForm<CreateBrandInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateBrandMutation, CreateBrandMutationVariables>(CREATE_BRAND)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    input
                }
            })

            if (data?.createBrand?.ok) {
                onCompleted()
            } else {
                throw Error(data?.createBrand?.error ?? "Error")
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

