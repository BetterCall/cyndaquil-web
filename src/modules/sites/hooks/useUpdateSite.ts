import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { UpdateSiteInput } from "../../../__generated__/globalTypes";
import { UPDATE_SITE } from "../sites.queries";
import { UpdateSiteMutation, UpdateSiteMutationVariables } from "../../../__generated__/UpdateSiteMutation";
import { parseParams } from "../../../helpers/clean-object";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useUpdateSite = ({ id, onCompleted }: IProps) => {

    const form = useForm<UpdateSiteInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UPDATE_SITE)

    const submit = async () => {
        if (loading) return
        try {

            const input = form.getValues()
            console.log('INPUt ', parseParams(input))
            const { data } = await mutate({
                variables: {
                    id,
                    input: parseParams(input)
                },
            });

            if (data?.updateSite?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateSite?.error ?? "Error")
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

