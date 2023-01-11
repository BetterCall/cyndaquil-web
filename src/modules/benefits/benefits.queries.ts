import { gql } from '@apollo/client'

export const CREATE_BENEFIT = gql`

    mutation CreateBenefitMutation( $input : CreateBenefitInput! ) {
        createBenefit( input : $input) {
            ok 
            error 
            id
        }
    }
`

export const BENEFIT = gql`

    query BenefitQuery( $id : Int! ) {
        benefit( id : $id) {
            ok 
            error 
            result {
                id
                name
                price
                
            }
        }
    }
`

export const REMOVE_BENEFIT = gql`

    mutation RemoveBenefitMutation( $id : Int! ) {
        removeBenefit( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_BENEFIT = gql`
    mutation UpdateBenefitMutation( $id : Int! ,  $input : UpdateBenefitInput! ) {
        updateBenefit( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`

export const BENEFITS = gql`

    query BenefitsQuery( $where  : BenefitFiltersInput! ) {
        benefits ( where: $where ) {
            results {
                id
                name 
                price
            }
        }
    }

`