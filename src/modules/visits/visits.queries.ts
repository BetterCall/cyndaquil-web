import { gql } from '@apollo/client'

export const VISIT_FRAGMENT = gql`
    fragment VisitPart on Visit {
        id 
        object
        description
        date
        start
        status

        report
        
        lat
        lng
        streetNumber
        street
        postal 
        city
    }
`

export const CREATE_VISIT = gql`

        mutation CreateVisitMutation ( $input : CreateVisitInput! ) {
            createVisit(  input : $input ) {
                ok 
                error
                id
            }
        }

`
export const UPDATE_VISIT = gql`

        mutation UpdateVisitMutation ( $id : Int! , $input : UpdateVisitInput! ) {
            updateVisit(  id : $id , input : $input ) {
                ok 
                error
            }
        }

`

export const VISITS = gql`

    query VisitsQuery( $limit : Int , $offset : Int , $where : VisitFiltersInput! ) {
        visits( limit : $limit , offset : $offset, where : $where  ) {
            hasMore ,
            ok, 
            error, 
            results {
                ...VisitPart

                user {
                    id
                    firstname
                    lastname
                }

                customer {
                    id 
                    name 
                }

            }
        }
    }
    ${VISIT_FRAGMENT}
`

export const VISIT = gql`

query VisitQuery ( $id : Int! ) {
    visit(  id : $id ) {
        ok 
        error 
        result {
            ...VisitPart

            userId
            user {
                id
                firstname
                lastname
            }

            customerId 
            customer  {
                id 
                name
               
            }
        }
    }
}
${VISIT_FRAGMENT}
`


export const UPDATE_VISIT_REPORT = gql`

    mutation UpdateVisitReportMutation( $id : Int! , $input : UpdateVisitReportInput! ) {
        updateVisitReport ( id : $id , input: $input ) {
            ok 
            error
        }
    }

`
