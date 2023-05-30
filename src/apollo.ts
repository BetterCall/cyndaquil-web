import {
    ApolloClient,
    InMemoryCache,
    makeVar,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { LOCALSTORAGE_TOKEN } from "./contants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const godModeVar = makeVar(false);
export const adminTokenVar = makeVar("");

export const url = "http://192.168.1.152:5000"
export const uri = url + "/graphql"
// const uri = "http://192.168.1.156:4000/graphql"

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
                        keyArgs: ["where", ["search", "role", "roles"]],
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
                        keyArgs: ["where", ["status", "userId", "search", "critical", "url"]],

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

                    changelogs: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["userId", "database", "event"]],
                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            return {
                                ...incoming,
                                results: [...(existing.results || []), ...incoming.results]
                            }
                        },
                    },

                    // emplacements: {
                    //     // Don't cache separate results based on
                    //     // any of this field's arguments.
                    //     keyArgs: ["where", ["siteId"]],

                    //     // Concatenate the incoming list items with
                    //     // the existing list items.
                    //     merge(existing = {}, incoming, { args }): any {
                    //         console.log('hey there', args)

                    //         let array = [...(existing.results || []), ...incoming.results]
                    //         console.log(array)
                    //         //@ts-ignore
                    //         const results = Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
                    //         return {
                    //             ...incoming,
                    //             results
                    //         }
                    //     },
                    // },


                    sites: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "customerId", "managerId", "siteId", "postal", "city"]],

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
                        keyArgs: ["where", ["search", "siteId", "customerId", "categoryId"]],

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

                    workOrder: {
                        read(_, { args, toReference }) {
                            return toReference({
                                __typename: 'WorkOrder',
                                id: args?.id,
                            });
                        }
                    },

                    workOrderRow: {
                        read(_, { args, toReference }) {
                            return toReference({
                                __typename: 'WorkOrderRow',
                                id: args?.id,
                            });
                        }
                    },

                    workOrders: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["search", "userId", "status", "postal", "date", "customerId", "siteId", 'billed']],

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
                        keyArgs: ["where", ["search", "brandId", 'categoryId']],

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

                    uploads: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["where", ["database", "objectId"]],

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

                    godMode: {
                        read() {
                            return godModeVar();
                        },
                    },

                },
            },
        },
    }),
});