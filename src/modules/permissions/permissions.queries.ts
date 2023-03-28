import { gql } from '@apollo/client'

export const UPDATE_PERMISSION = gql`
    mutation UpdatePermissionMutation( $id : Int! ,  $input : UpdatePermissionInput! ) {
        updatePermission( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`
export const PERMISSIONS = gql`
    query PermissionsQuery {
        permissions {
            ok
            results {
                id
                resource
                action
                label
                roles

                users {
                    id
                    active
                    userId
                    user {
                        id 
                        firstname
                        lastname
                    }
                }
            }
        }
    }
`


export const USER_PERMISSIONS = gql`
    query UserPermissionsQuery( $userId : Int! ) {
        userPermissions( userId : $userId ) {
            ok
            results {
                id
                
                permissionId {
                    id
                    label
                }
            } 
        }
    }
`

export const PERMISSION_USERS = gql`
    query PermissionUsersQuery( $permissionsId : Int! ) {
        userPermissions( permissionId : $permissionsId  ) {
            ok
            results {
                id
                user {
                    id
                    firstname
                    lastname
                }

            } 
        }
    }
`

export const TOGGLE_PERMISSION = gql`
    mutation TogglePermissionMutation(  $permissionId: Int!  , $userId: Int! )  {
        togglePermission(  permissionId: $permissionId  , userId: $userId )
    }
`