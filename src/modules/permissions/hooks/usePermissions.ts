import { useQuery } from "@apollo/client";
import { PERMISSIONS } from '../permissions.queries';
import { PermissionsQuery } from '../../../__generated__/PermissionsQuery';

export const usePermissions = () => {
    return useQuery<PermissionsQuery>(PERMISSIONS);
}
