const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String
    author: Author
  }

  # This "Author" type defines the queryable fields for every author in our data source.
  type Author {
    id: ID
    name: String
    books: [Book]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    book(id: ID): Book
    books: [Book]
    author(id: ID): Author
    authors: [Author]
  }

  # The "Mutation" type is also special: it lists all of the available mutations that
  # clients can execute, along with the return type for each. Arguments to the mutation
  # are passed inside the parentheses.
  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;

export default typeDefs;
