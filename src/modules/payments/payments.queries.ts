import { gql } from '@apollo/client'

export const CREATE_PAYMENT = gql`

    mutation CreatePaymentMutation( $input : CreatePaymentInput! ) {
        createPayment( input : $input ) {
            ok 
            error 
            id
        }
    }

`

export const PAYMENTS = gql`

query PaymentsQuery( $limit : Int  , $offset : Int  , $where : PaymentFiltersInput! ) {
    payments( limit : $limit , offset : $offset, where : $where  ) {
        hasMore , 
        results {
            id
            type
            
            customerId 
            customer {
                id
                name 

            }
            invoiceId
            invoice {
                id 
                site {
                    id 
                    name
                }
            }
         
            recordedBy {
                id
                firstname
                lastname
            }
        }
    }
}

`

export const PAYMENT = gql`
 query PaymentQuery ( $id  : Int! ) {
    payment(id: $id ) {
      ok
      error
      result {
        id
        type

        recordedBy {
            id 
            firstname
            lastname
        }

        customer {
           id 
           name 
            category {
                id 
                name
            }
        }

        invoice {
            id 
            site {
                id
                name 

            }
        }
        
      }
    }
  }
 
  `


export const UPDATE_PAYMENT = gql`

    mutation UpdatePaymentMutation ( $id : Int! , $input : UpdatePaymentInput! ) {
        updatePayment ( id : $id , input : $input )  {
            ok 
            error
        }
    }

`