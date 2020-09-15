import server from "./server";

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

// https://github.com/remy/nodemon/issues/1025
process.on("SIGINT", () => process.exit());
