import { useQuery } from "@apollo/client";
import { MY_USER_PERMISSIONS } from '../permissions.queries';
import { MyUserPermissionsQuery } from '../../../__generated__/MyUserPermissionsQuery';

export const useMyUserPermissions = () => {
    return useQuery<MyUserPermissionsQuery>(MY_USER_PERMISSIONS);
}
