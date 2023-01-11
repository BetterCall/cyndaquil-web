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


export const LOGIN_AS_MUTATION = gql`
    mutation LoginAsMutation ( $input : LoginAsInput! ) {
            loginAs(input :$input ) {
                ok 
                error 
                token
            }
        }
`

export const CREATE_USER = gql`

    mutation CreateUserMutation($input : CreateUserInput!) {
    createUser(input : $input) {
        ok
        error
        id
    }
}

`

export const UPDATE_USER = gql`

        mutation UpdateUserMutation($ id : Int!, $input : UpdateUserInput!) {
    updateUser(id : $ id, input : $input) {
        ok
        error
    }
}

`

export const USERS = gql`

query UsersQuery($limit : Int, $offset : Int, $where : UsersFiltersInput!) {
    users(limit : $limit, offset : $offset, where : $where) {
        hasMore,
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

query UserQuery($ id : Int!) {
    user(id : $ id) {
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