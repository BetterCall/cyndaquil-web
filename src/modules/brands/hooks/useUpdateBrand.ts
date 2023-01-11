import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateBrandInput, } from "../../../__generated__/globalTypes";
import { UPDATE_BRAND } from "../brands.queries";
import { UpdateBrandMutation, UpdateBrandMutationVariables } from "../../../__generated__/UpdateBrandMutation";


interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateBrand = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateBrandInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateBrandMutation, UpdateBrandMutationVariables>(UPDATE_BRAND)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            const { data } = await mutate({
                variables: {
                    id,
                    input
                },
            });

            if (data?.updateBrand?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateBrand?.error ?? "Error")
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

