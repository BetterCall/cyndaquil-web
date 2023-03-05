import { gql } from "@apollo/client"


export const CHANGELOG = gql`

query ChangelogQuery( $id : Int! ) {
    changelog( id : $id ) {
        ok 
        error 
        result {
            id
            database
            objectId

            changes
                important 
                event

            userId
            user {
                id
                firstname
                lastname
            }
        }
       
    }
}
`


export const CHANGELOGS = gql`

    query ChangelogsQuery( $limit : Int , $offset : Int  , $where : ChangelogFiltersInput! ) {
        changelogs ( limit : $limit , offset : $offset , where : $where ) {
            hasMore 
            results  {
                    id
                database
                objectId
                changes
                important 
                event

                userId
                user {
                    id
                    firstname
                    lastname
                }
            }
        }
    }
`
