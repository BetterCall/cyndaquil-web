import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { UPDATE_VISIT_REPORT } from "../visits.queries";
import { parseParams } from "../../../helpers/clean-object";

import { UpdateVisitReportInput, } from "../../../__generated__/globalTypes";
import {
    UpdateVisitReportMutation,
    UpdateVisitReportMutationVariables
} from "../../../__generated__/UpdateVisitReportMutation";

interface IProps {
    id: number,
    onCompleted: () => any,
    onError: (message: string) => any
}

export const useUpdateVisitReport = ({ id, onCompleted, onError }: IProps) => {

    const form = useForm<UpdateVisitReportInput>({
        mode: "all",
    })
    const [mutate, { loading }] = useMutation<UpdateVisitReportMutation, UpdateVisitReportMutationVariables>(UPDATE_VISIT_REPORT)

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

            if (data?.updateVisitReport?.ok) {
                onCompleted()
            } else {
                throw Error(data?.updateVisitReport?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
            onError(error.message)
        }
    }

    return {
        form,
        mutate,
        loading,
        submit
    }
}

