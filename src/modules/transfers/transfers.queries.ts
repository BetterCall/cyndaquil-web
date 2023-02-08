import { gql } from '@apollo/client'

export const TRANSFER_FRAGMENT = gql`
    fragment TransferPart on Transfer {
        id 
        iban
        amount
        comment

        createdAt
        customerId 
        customer {
            id
            name
        }

        recordedById
        recordedBy {
            id
            firstname
            lastname
        }
    }
`

export const CREATE_TRANSFER = gql`

        mutation CreateTransferMutation ( $input : CreateTransferInput! ) {
            createTransfer(  input : $input ) {
                ok 
                error
                id
            }
        }
`

export const UPDATE_TRANSFER = gql`

        mutation UpdateTransferMutation ( $id : Int! , $input : UpdateTransferInput! ) {
            updateTransfer(  id : $id , input : $input ) {
                ok 
                error
            }
        }

`

export const TRANSFERS = gql`

    query TransfersQuery( $limit : Int , $offset : Int , $where : TransferFiltersInput! ) {
        transfers( limit : $limit , offset : $offset, where : $where  ) {
            hasMore , 
            results {
                ...TransferPart
            }
        }
    }
    ${TRANSFER_FRAGMENT}
`

export const TRANSFER = gql`

query TransferQuery ( $id : Int! ) {
    transfer(  id : $id ) {
        ok 
        error 
        result {
            ...TransferPart
        }
    }
}
${TRANSFER_FRAGMENT}
`
