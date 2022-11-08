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

export const REMOVE_EMPLACEMENT = gql`

        mutation RemoveEmplacementMutation( $id : Int! ){
            removeEmplacement ( id : $id ) {
                ok 
                error 
            }
        }

`