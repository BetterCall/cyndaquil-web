import { gql } from '@apollo/client'

export const CREATE_INVOICE = gql`

    mutation CreateInvoiceMutation( $input : CreateInvoiceInput! ) {
        createInvoice( input : $input ) {
            ok 
            error 
            id
        }
    }

`


export const INVOICES = gql`

query InvoicesQuery( $limit : Int  , $offset : Int  , $where : InvoiceFiltersInput! ) {
    invoices( limit : $limit , offset : $offset, where : $where  ) {
        hasMore , 
        results {
            id
            status
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

export const INVOICE = gql`
 query InvoiceQuery ( $id  : Int! ) {
    invoice(id: $id ) {
      ok
      error
      result {
        id
        status
        preTaxPrice
        taxPrice  
        amountRemaining
        totalPrice

        createdAt

         customerId 
         customer {
            id
            name
            streetNumber
            street
            postal 
            city
         }

         siteId 
         site {
            id
            name
            streetNumber
            street
            postal 
            city
         }

         rows {
            line
            type
            unitPrice
            quantity
            taxe
            taxPrice
            totalPrice
         }
      }
    }
  }
 
  `


export const UPDATE_INVOICE = gql`

    mutation UpdateInvoiceMutation ( $id : Int! , $input : UpdateInvoiceInput! ) {
        updateInvoice ( id : $id , input : $input )  {
            ok 
            error
        }
    }

`