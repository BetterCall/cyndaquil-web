import { useMutation } from "@apollo/client";
import { UPDATE_EMPLACEMENT } from "../emplacements.queries";
import { RemoveEmplacementMutation, RemoveEmplacementMutationVariables } from "../../../__generated__/RemoveEmplacementMutation";

interface IProps {
    id: number,
    onCompleted: () => any
}

export const useRemoveEmplacement = ({ id, onCompleted }: IProps) => {

    const [mutate, { loading }] = useMutation<RemoveEmplacementMutation, RemoveEmplacementMutationVariables>(UPDATE_EMPLACEMENT)

    const submit = async () => {
        if (loading) return
        try {

            const { data } = await mutate({ variables: { id } });

            if (data?.removeEmplacement?.ok) {
                onCompleted()
            } else {
                throw Error(data?.removeEmplacement?.error ?? "Error")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        mutate,
        loading,
        submit
    }
}

