import { gql } from '@apollo/client'

export const CREATE_REFERENCE = gql`

    mutation CreateReferenceMutation( $input : CreateReferenceInput! ) {
        createReference( input : $input) {
            ok 
            error 
            id
        }
    }
`


export const REFERENCE = gql`

    query ReferenceQuery( $id : Int! ) {
        reference( id : $id) {
            ok 
            error 
            result {
                id
                name
            }
        }
    }
`


export const REMOVE_REFERENCE = gql`

    mutation RemoveReferenceMutation( $id : Int! ) {
        removeCall( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_REFERENCE = gql`
    mutation UpdateReferenceMutation( $id : Int! ,  $input : UpdateReferenceInput! ) {
        updateReference( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`
export const REFERENCES = gql`
    query ReferencesQuery( $limit : Int! , $offset : Int! , $where : ReferencesFiltersInput! ) {
        references( limit : $limit , offset : $offset ,  where: $where  ) {
            hasMore
            results {
                id
                name
            }
        }
    }

`