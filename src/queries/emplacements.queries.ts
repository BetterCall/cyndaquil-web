import { gql } from '@apollo/client'


export const CREATE_EMPLACEMENT = gql`

        mutation CreateEmplacementMutation ( $input : CreateEmplacementInput! ) {
            createEmplacement ( input : $input ) {
                ok 
                error 
                id
            }
        }

`

export const DELETE_EMPLACEMENT = gql`

        mutation DeleteEmplacementMutation( $id : Int! ){
            deleteEmplacement ( id : $id ) {
                ok 
                error 
            }
        }

`