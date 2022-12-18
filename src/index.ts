import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typedefs.js";

// Two different versions of the resolvers. One simply uses the data-temp.js file
// as the data source. This however, won't give "save" the changes you make in
// your mutations. The other one targets the files in /src/data/ with the help
// of the npm package fakebase. It emulates a DB with normal .json files.
import resolversTemp from "./resolvers-temp.js";
import resolversFake from "./resolvers-fakebase.js";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: typeDefs,
  // CHANGE THIS TO: 'resolvers: resolversFake' IF YOU WANNA USE FAKEBASE INSTEAD
  resolvers: resolversTemp,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
