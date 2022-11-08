import { gql } from '@apollo/client'

export const CREATE_PRICE_RULE = gql`

    mutation CreatePriceRuleMutation( $input : CreatePriceRuleInput! ) {
        createPriceRule( input : $input) {
            ok 
            error 
            id
        }
    }
`


export const PRICE_RULE = gql`

    query PriceRuleQuery( $id : Int! ) {
        priceRule( id : $id) {
            ok 
            error 
            result {
                id
                amount
                type
                description
                benefit {
                    id 
                    name
                }
                category {
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


export const REMOVE_PRICE_RULE = gql`

    mutation RemovePriceRuleMutation( $id : Int! ) {
        removePriceRule( id : $id ) {
            ok 
            error
        }
    }

`
export const UPDATE_PRICE_RULE = gql`
    mutation UpdatePriceRuleMutation( $id : Int! ,  $input : UpdatePriceRuleInput! ) {
        updatePriceRule( id : $id ,  input : $input ) {
            ok 
            error
        }
    }

`
export const PRICE_RULES = gql`
    query PriceRulesQuery( $limit : Int! , $offset : Int! , $where : PriceRulesFiltersInput! ) {
        priceRules( limit : $limit , offset : $offset ,  where: $where  ) {
            hasMore
            results {
                id
                amount
                description
                type

                customer {
                    id 
                    name
                }

                benefit {
                    id
                    name
                }

                category {
                    id 
                    name
                }

            }
        }
    }

`