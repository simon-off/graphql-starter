import { booksData, authorsData } from "./data-temp.js";

// TypeScript Types.
interface Book {
  id: string;
  title: string;
  authorId: string;
}

interface Author {
  id: string;
  name: string;
}

// Helper function to create a new Author
const makeAuthor = (name: string) => {
  const author = {
    name: name,
    id: (authorsData.length + 1).toString(),
  };
  authorsData.push(author);
  return author.id;
};

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Mutation: {
    addBook: (_: null, args: { title: string; author: string }) => {
      // Check to see if the author already exists
      const existingAuthor = authorsData.find(
        (author) => author.name.toLowerCase() === args.author.toLowerCase()
      );
      // Check to see if the book already exists
      const existingBook = booksData.find(
        (book) => book.title.toLowerCase() === args.title.toLowerCase()
      );

      // Check if the book we are trying to add already exist and the existing
      // book has the same author as the one we are trying to add
      // (since different authors can have books with the same title!)
      if (existingBook && existingAuthor) {
        if (existingBook.authorId === existingAuthor.id) return existingBook;
      }

      // Otherwise we create a new book! And a new author if one doesn't exist.
      const newBook: Book = {
        id: (booksData.length + 1).toString(),
        title: args.title,
        authorId: existingAuthor ? existingAuthor.id : makeAuthor(args.author),
      };
      booksData.push(newBook);
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
