import { useMutation } from "@apollo/client";
import { TOGGLE_PERMISSION } from "../permissions.queries";
import { TogglePermissionMutation, TogglePermissionMutationVariables } from "../../../__generated__/TogglePermissionMutation";


interface IProps {
    userId: number,
    permissionId: number,
    onCompleted: () => any
    onError: (message: string) => any
}

export const useTogglePermission = ({ userId, permissionId, onCompleted, onError }: IProps) => {

    const [mutate, { loading }] = useMutation<TogglePermissionMutation, TogglePermissionMutationVariables>(TOGGLE_PERMISSION)
    const submit = async () => {
        if (loading) return
        try {

            console.log({
                userId,
                permissionId,
            })
            const { data, errors } = await mutate({
                variables: {
                    userId,
                    permissionId,
                },
            });

            console.log(data)
            console.log(errors)

            if (data?.togglePermission) {
                onCompleted()
            } else {
                throw Error("Error")
            }

        } catch (error) {
            console.log(error)
            onError(error.message)
        }
    }

    return {
        mutate,
        loading,
        submit
    }
}

