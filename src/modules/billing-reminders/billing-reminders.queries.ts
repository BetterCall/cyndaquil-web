import { gql } from '@apollo/client'

export const CREATE_BILLING_REMINDER = gql`

    mutation CreateBillingReminderMutation( $input : CreateBillingReminderInput! ) {
        createBillingReminder( input : $input ) {
            ok 
            error 
            id
        }
    }

`


export const BILLING_REMINDERS = gql`

query BillingRemindersQuery( $limit : Int  , $offset : Int  , $where : BillingRemindersFiltersInput! ) {
    billingReminders( limit : $limit , offset : $offset, where : $where  ) {
        hasMore , 
        results {
            id
            type
            
            madeById
            madeBy {
                id
                firstname
                lastname
            }

            invoiceId
            invoice {
                id
            }

            customerId
            customer {
                id
                name 

            }
            
            siteId
            site {
                id 
                name
            }

            contactId
            contact {
                id
                firstname
                lastname
            }
          
        }
    }
}

`

export const BILLING_REMINDER = gql`
 query BillingReminderQuery ( $id  : Int! ) {
    billingReminder(id: $id ) {
      ok
      error
      result {
        id

        madeById
        madeBy {
            id
            firstname
            lastname
        }

        invoiceId
        invoice {
            id
        }

        customerId
        customer {
            id
            name 

        }
        
        siteId
        site {
            id 
            name
        }

        contactId
        contact {
            id
            firstname
            lastname
        }
      }
    }
  }
 
  `


export const UPDATE_BILLING_REMINDER = gql`

    mutation UpdateBillingReminderMutation ( $id : Int! , $input : UpdateBillingReminderInput! ) {
        updateBillingReminder ( id : $id , input : $input )  {
            ok 
            error
        }
    }

`