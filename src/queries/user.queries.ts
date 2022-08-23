import { gql } from '@apollo/client'

export const ME_QUERY = gql`

    query MeQuery {
        me {
            id
            firstname
            email
            role
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation LoginMutation ( $input : LoginInput! ) {
            login(input :$input ) {
                ok 
                error 
                token
            }
        }

`


export const EDIT_USER = gql`

        mutation EditUserMutation ( $ id : Int! , $input : EditUserInput! ) {
            editUser(  id : $ id , input : $input ) {
                ok 
                error 
            }
        }

`

export const USERS = gql`

query UsersQuery( $limit : Int! , $offset : Int!   ) {
    users( limit : $limit , offset : $offset  ) {
        hasMore , 
        results {
            id 
            firstname
            lastname
            email
            role
        }
    }
}
`

export const SEARCH_USERS = gql`

query SearchUsersQuery( $limit : Int! , $offset : Int! , $where :UserFiltersInput! ) {
    searchUsers( limit : $limit , offset : $offset, where : $where  ) {
        hasMore , 
        results {
            id 
            firstname
            lastname
            email
            role
        }
    }
}
`

export const USER = gql`

query UserQuery ( $ id : Int! ) {
    user(  id : $ id ) {
        ok 
        error 
        result {
            id 
            firstname
            lastname 
            email
        }
    }
}

`