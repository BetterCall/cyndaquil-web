import { gql } from '@apollo/client'


export const UPLOADS = gql`

    query UploadsQuery( $limit : Int , $offset : Int , $where : UploadFiltersInput! ) {
        uploads( limit : $limit , offset : $offset, where : $where  ) {
            hasMore , 
            results {
                id 
                database
                objectId
                url
                publicLink

                thumbnailUrl
                thumbnaiPublicLink

                informations

                categoryId

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
