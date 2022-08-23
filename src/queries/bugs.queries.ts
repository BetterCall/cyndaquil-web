import { gql } from "@apollo/client"


export const BUG = gql`

query BugQuery( $id : Int! ) {
    bug( id : $id ) {
        ok 
        error 
        result {
            id
            url
            description
            status

            user {
                id 
                firstname
                lastname
            }
        }
       
    }
}
`


export const CREATE_BUG = gql`

    mutation CreateBugMutation( $input : CreateBugInput! ) {
        createBug( input : $input ){
            ok 
            error
            id
        }
    }

`

export const BUGS = gql`

    query BugsQuery( $limit : Int! , $offset : Int! , $where : BugFiltersInput! ) {
        bugs ( limit : $limit , offset : $offset , where : $where ) {
            hasMore 
            results  {
                id 
                url
                description

                user {
                    id
                    firstname
                    lastname
                }
            }
        }
    }
`

export const DELETE_BUG = gql`

    mutation DeleteBugMutation( $id :Int !  ) {
        deleteBug( id : $id ) {
            ok 
            error 
        }
    }
`

export const EDIT_BUG = gql`

    mutation EditBugMutation( $id :Int! , $input : EditBugInput! ) {
        editBug( id : $id  , input : $input ) {
            ok
            error
        }
    }

`