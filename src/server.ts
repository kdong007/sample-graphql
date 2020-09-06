import { ApolloServer, gql } from "apollo-server";

import fs from "fs";
import path from "path";

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.gql")).toString();

//
// A map of functions which return data for the schema.
const resolvers = {
    Name: {
        fullName: (name) => {
            const { firstName, lastName } = name;

            return firstName + "," + lastName;
        },
    },
    Query: {
        hello: () => "world",
        time: () => {
            console.log("time resolver");

            return new Date().toString();
        },
        getName: () => {
            return {
                firstName: "sisi",
                lastName: "Xu",
            };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
