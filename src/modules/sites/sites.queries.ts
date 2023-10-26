import { gql } from '@apollo/client'


export const SITE_FRAGMENT = gql`
    fragment SitePart on Site {
        id 

        buildingsCount
        entrancesCount

        name
        completed
        lat
        lng
        streetNumber
        street
        postal 
        city
    }
`


export const CREATE_SITE = gql`

        mutation CreateSiteMutation ( $input : CreateSiteInput! ) {
            createSite(  input : $input ) {
                ok 
                error
                id
                customer {
                    id
                    name 
                    category {
                        id
                        name
                    }
                }
            }
        }

`

export const UPDATE_SITE = gql`

        mutation UpdateSiteMutation ( $ id : Int! , $input : UpdateSiteInput! ) {
            updateSite(  id : $ id , input : $input ) {
                ok 
                error
                customer {
                    id
                    name 
                    category {
                        id
                        name
                    }
                }
            }
        }

`


export const SITES = gql`

    query SitesQuery( $limit : Int! , $offset : Int! , $where : SiteFiltersInput! ) {
        sites( limit : $limit , offset : $offset, where : $where  ) {
            hasMore ,
            total, 
            results {
                ...SitePart

                customerId
                customer {
                    id 
                    name 
                    category {
                        id 
                        name
                    }
                }
            }
        }
    }
    ${SITE_FRAGMENT}
`

export const SITE = gql`

query SiteQuery ( $ id : Int! ) {
    site(  id : $ id ) {
        ok 
        error 
        result {
            ...SitePart

            customerId
            customer {
                id 
                name
                email
                phone
                commercialId
                commercial {
                    id
                    firstname
                    lastname
                }
                sitesCount
                category {
                    id 
                    name
                }

            }

            managerId
            manager {
                id
                firstname
                lastname
                email
                phone

                sitesCount
            }

            contacts {
                id
                firstname
                lastname
                email
                phone
            }
         
        }
    }
}
${SITE_FRAGMENT}

`
