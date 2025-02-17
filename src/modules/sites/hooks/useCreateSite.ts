import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateSiteInput } from "../../../__generated__/globalTypes";
import { CreateSiteMutation, CreateSiteMutationVariables } from "../../../__generated__/CreateSiteMutation";
import { CREATE_SITE } from "../sites.queries";
import { parseParams } from "../../../helpers/clean-object";


interface IProps {
    defaultValues: CreateSiteInput
    onCompleted: (id: number) => any
    onError?: (msg: string) => any
}

export const useCreateSite = ({ defaultValues, onCompleted, onError }: IProps) => {

    const form = useForm<CreateSiteInput>({
        mode: "all",
        defaultValues
    })
    const [mutate, { loading }] = useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CREATE_SITE)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            console.log('input', parseParams(input))
            const { data } = await mutate({
                variables: {
                    input: parseParams(input)
                }
            })

            if (data?.createSite?.ok && data?.createSite?.id) {
                onCompleted(data?.createSite?.id)
            } else {
                throw Error(data?.createSite?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
            onError?.(error.message)
        }
    }
    return {
        form,
        mutate,
        loading,
        submit
    }
}

