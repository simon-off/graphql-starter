import { booksData, authorsData } from "./data.js";

// TypeScript Types.
interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
}

interface Author {
  id: string;
  name: string;
  books: Book[];
}

const makeAuthor = (name) => {
  const author = {
    name: name,
    id: (authorsData.length + 1).toString(),
  };
  return author.id;
};

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Mutation: {
    addBook: (_: any, args: Book) => {
      const existingAuthor = authorsData.find(
        (author) => author.name.toLowerCase() === args.author.toLowerCase()
      );
      const newBook: Book = {
        id: (booksData.length + 1).toString(),
        title: args.title,
        author: args.author,
        authorId: existingAuthor ? existingAuthor.id : makeAuthor(args.author),
      };
      return newBook;
    },
  },
  Query: {
    book: (_: null, args: { id: string }) => {
      return booksData.find((book) => book.id === args.id);
    },
    books: () => {
      return booksData;
    },
    author: (_: null, args: { id: string }) => {
      return authorsData.find((author) => author.id === args.id);
    },
    authors: () => {
      return authorsData;
    },
  },
  Book: {
    author: (parent: Book) => {
      return authorsData.find((author) => author.id === parent.authorId);
    },
  },
  Author: {
    books: (parent: Author) => {
      return booksData.filter((book) => book.authorId === parent.id);
    },
  },
};

export default resolvers;
