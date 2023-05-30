module.exports = {
    client: {
        includes: ["./src/**/*.ts"],
        tagName:  "gql" ,
        service: {
            name: "cyndaquil",
            url: "http://localhost:5000/graphql",
        
        },
    }
  };