import React from "react";

import {
    ApolloClient,
    InMemoryCache,
    makeVar,
    createHttpLink,
    ReactiveVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./contants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const emplacementIdsVar: ReactiveVar<number[]> = makeVar([0])



const uri = "http://192.168.1.152:4000/graphql"

const httpLink = createHttpLink({
    uri
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || null,
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    users: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "role"]],
                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            return {
                                ...incoming,
                                results: [...(existing.results || []), ...incoming.results]
                            }
                        },
                    },


                    bugs: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["status", "userId"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...incoming.results, ...(existing.results || [])]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
                            return {
                                ...incoming,
                                results
                            }
                        },
                    },


                    customers: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "categoryId", "city", "postal"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...(existing.results || []), ...incoming.results]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);

                            return {
                                ...incoming,
                                results
                            }
                            // return [...existing, ...incoming];
                        },
                    },

                    sites: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "customerId", "siteId", "postal", "city"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...incoming.results, ...(existing.results || [])]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);

                            return {
                                ...incoming,
                                results
                            }
                            // return [...existing, ...incoming];
                        },
                    },

                    floors: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["entranceId"],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {

                            let array = [...incoming.results, ...(existing.results || [])]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);

                            // let basementsArray = [...incoming.basements, ...(existing.basements || [])]
                            // //@ts-ignore
                            // const basements = Array.from(new Set(basementsArray.map(JSON.stringify))).map(JSON.parse);
                            return {
                                ...incoming,
                                results
                            }
                            // return [...existing, ...incoming];
                        },
                    },

                    calls: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "customerId", "siteId", "userId"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...incoming.results, ...(existing.results || [])]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);

                            return {
                                ...incoming,
                                results
                            }
                            // return [...existing, ...incoming];
                        },
                    },

                    contacts: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "siteId", "customerId"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...incoming.results, ...(existing.results || [])]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
                            return {
                                ...incoming,
                                results
                            }
                        },
                    },

                    workOrders: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "userId", "status", "postal", "date", "customerId", "siteId"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...(existing.results || []), ...incoming.results]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
                            return {
                                ...incoming,
                                results
                            }
                        },
                    },

                    references: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "brandId"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...incoming.results, ...(existing.results || [])]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
                            return {
                                ...incoming,
                                results
                            }
                        },
                    },


                    benefits: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["categoryId"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...incoming.results, ...(existing.results || [])]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
                            return {
                                ...incoming,
                                results
                            }
                        },
                    },

                    prices: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["benefitId", "customerId"]],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            let array = [...incoming.results, ...(existing.results || [])]
                            //@ts-ignore
                            const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
                            return {
                                ...incoming,
                                results
                            }
                        },
                    },




                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        },
                    },
                    token: {
                        read() {
                            return authTokenVar();
                        },
                    },

                },
            },
        },
    }),
});