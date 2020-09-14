import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
import { Resolvers } from "./generated/graphql";

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.gql")).toString();

//
// A map of functions which return data for the schema.
const resolvers: Resolvers = {
    Name: {
        fullName: (name) => {
            const { firstName, lastName } = name;

            return firstName + "," + lastName;
        },
    },
    Query: {},
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
