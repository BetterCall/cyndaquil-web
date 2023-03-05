import { gql } from "@apollo/client"


export const BUG = gql`

query BugQuery( $id : Int! ) {
    bug( id : $id ) {
        ok 
        error 
        result {
            id
            url
            object
            critical
            description
            status

            report

            createdAt

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
                status
                object
                critical
                user {
                    id
                    firstname
                    lastname
                }
            }
        }
    }
`

export const REMOVE_BUG = gql`

    mutation RemoveBugMutation( $id :Int !  ) {
        removeBug( id : $id ) {
            ok 
            error 
        }
    }
`

export const UPDATE_BUG = gql`

    mutation UpdateBugMutation( $id :Int! , $input : UpdateBugInput! ) {
        updateBug( id : $id  , input : $input ) {
            ok
            error
        }
    }

`