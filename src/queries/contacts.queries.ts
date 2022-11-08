import { gql } from "@apollo/client"


export const CONTACT = gql`

query ContactQuery( $id : Int! ) {
    contact( id : $id ) {
        ok 
        error 
        result {
            id
            firstname
            lastname
            phone
            email

            customer {
                id
                name 
            }

            site {
                id
                name
            }
        }
       
    }
}
`


export const CREATE_CONTACT = gql`

    mutation CreateContactMutation( $input : CreateContactInput! ) {
        createContact( input : $input ){
            ok 
            error
            id
        }
    }

`

export const CONTACTS = gql`

    query ContactsQuery( $limit : Int! , $offset : Int! , $where : ContactFiltersInput! ) {
        contacts ( limit : $limit , offset : $offset , where : $where ) {
            hasMore 
            results  {
                id 
                firstname
                lastname
                phone
                email

                site {
                    id 
                    name 
                }

                customer {
                    id 
                    name
                }
            }
        }
    }
`

export const REMOVE_CONTACT = gql`

    mutation RemoveContactMutation( $id :Int !  ) {
        removeContact( id : $id ) {
            ok 
            error 
        }
    }
`

export const UPDATE_CONTACT = gql`

    mutation UpdateContactMutation( $id :Int! , $input : UpdateContactInput! ) {
        updateContact( id : $id  , input : $input ) {
            ok
            error
        }
    }

`