import { gql } from '@apollo/client'


export const SITE_FRAGMENT = gql`
    fragment SitePart on Site {
        id 
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

export const EDIT_SITE = gql`

        mutation EditSiteMutation ( $ id : Int! , $input : EditSiteInput! ) {
            editSite(  id : $ id , input : $input ) {
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
                category {
                    id 
                    name
                }
            }

            contacts {
                id
                firstname
                lastname
                email
                phone
            }
            buildings {
                id
                name
                entrances {
                    id
                }
            }
        }
    }
}
${SITE_FRAGMENT}

`
export const SITE_EMPLACEMENTS = gql`

query SiteEmplacementsQuery( $id : Int ! ) {
    siteEmplacements(id:$id) {
      ok 
      error
      result {
        id 
        name 
        buildings {
          id
          name 
          entrances {
            id 
            name 
            floors {
              id
              name 
              emplacements {
                id 
                category {
                  id 
                  name
                }
                quotations {
                  id
                  contract {
                    id 
                    status
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

