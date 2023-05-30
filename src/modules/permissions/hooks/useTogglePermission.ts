import { useMutation } from "@apollo/client";
import { TOGGLE_PERMISSION } from "../permissions.queries";
import { TogglePermissionMutation, TogglePermissionMutationVariables } from "../../../__generated__/TogglePermissionMutation";
import { UserRole } from "../../../__generated__/globalTypes";


interface IProps {
    userRole?: UserRole,
    userId?: number,
    permissionId: number,
    onCompleted: () => any
    onError: (message: string) => any
}

export const useTogglePermission = ({ permissionId, onCompleted, onError, ...rest }: IProps) => {

    const [mutate, { loading }] = useMutation<TogglePermissionMutation, TogglePermissionMutationVariables>(TOGGLE_PERMISSION)
    const submit = async () => {
        if (loading) return
        try {
            const { data, errors } = await mutate({
                variables: {
                    ...rest,
                    permissionId,
                },
            });
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

