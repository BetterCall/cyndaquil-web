import {
    ApolloClient,
    InMemoryCache,
    makeVar,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./contants";
import { UsersQueryVariables } from "./__generated__/UsersQuery";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
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
                        keyArgs: false,

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            console.log('args ', args?.search)
                            console.log('existing ', existing)
                            console.log('incoming ', incoming)

                            console.log({
                                ...incoming,
                                results: [...(existing.results || []), ...incoming.results]
                            })
                            return {
                                ...incoming,
                                results: [...(existing.results || []), ...incoming.results]
                            }
                            // return [...existing, ...incoming];
                        },
                    },

                    searchUsers: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: ["search", "role"],

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = {}, incoming, { args }): any {
                            console.log('args ', args?.search)
                            console.log('existing ', existing)
                            console.log('incoming ', incoming)

                            console.log({
                                ...incoming,
                                results: [...(existing.results || []), ...incoming.results]
                            })
                            return {
                                ...incoming,
                                results: [...(existing.results || []), ...incoming.results]
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
                },
            },
        },
    }),
});