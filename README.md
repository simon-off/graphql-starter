# GraphQL Example Project

_Simple Apollo GraphQL Server example project using TypeScript._

This project is made to get up and running with GraphQL and Apollo Server. Most of it comes straight from the excellent instructions on the Apollo Docs: [Get started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/). I added a couple more queries and a mutation function that enables you to add new books. There's two versions of resolvers available two try out:

- One is simply using a JavaScript [object](./src/data-temp.ts) so no data is persistent. When you restart the server the data is back to it's original state. This implementation is found in the [resolvers-temp.ts](./src/resolvers-temp.ts) file.
- The other one uses a npm package called fakebase that enables to persist data in [json-files](./data/). This implementation is found in the [resolvers-fakebase.ts](./src/resolvers-fakebase.ts) file.

Chose which one to pass to Apollo Server in the [index.ts](./src/index.ts) file:

```ts
const server = new ApolloServer({
  typeDefs: typeDefs,
  // Change to: 'resolvers: resolversFake' if you wanna use fakebase
  resolvers: resolversTemp,
});
```

---

## 💿 Running the app:

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/simon-off/graphql-starter.git
$ cd graphql-starter
```

Then install all necessary dependencies by running:

```sh
$ npm install
```

Then simply start your local server instance by running:

```sh
$ npm start
```
