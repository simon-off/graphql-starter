import { Database, Entity } from "fakebase";

const db = new Database("./data/");
const booksTable = db.table<Book>("books");
const authorsTable = db.table<Author>("authors");

// TypeScript Types.
interface Book extends Entity {
  id: string;
  title: string;
  authorId: string;
}

interface Author extends Entity {
  id: string;
  name: string;
}

// Helper function to create a new Author in fakebase
const makeAuthor = async (name: string) => {
  const author = await authorsTable.create({ name: name });
  return author.id;
};

const resolvers = {
  Mutation: {
    addBook: async (_: null, args: { title: string; author: string }) => {
      // Check to see if Author already exists
      const existingAuthor = await authorsTable.findOne(
        (author: Author) => author.name.toLowerCase() === args.author.toLowerCase()
      );
      // Check to see if Book already exists
      const existingBook = await booksTable.findOne(
        (book: Book) => book.title.toLowerCase() === args.title.toLowerCase()
      );

      // Check if the book we are trying to add already exist and the existing
      // book has the same author as the one we are trying to add
      // (since different authors can have books with the same title!)
      if (existingBook && existingAuthor) {
        if (existingBook.authorId === existingAuthor.id) return existingBook;
      }

      // Otherwise we create a new book! And a new author if one doesn't exist.
      const newBook = await booksTable.create({
        title: args.title,
        authorId: existingAuthor ? existingAuthor.id : await makeAuthor(args.author),
      });
      return newBook;
    },
  },

  Query: {
    book: async (_: null, args: { id: string }) => {
      return await booksTable.findById(args.id);
    },
    books: async () => {
      return await booksTable.findAll();
    },
    author: async (_: null, args: { id: string }) => {
      return await authorsTable.findById(args.id);
    },
    authors: async () => {
      return await authorsTable.findAll();
    },
  },

  Book: {
    author: async (parent: Book) => {
      return await authorsTable.findById(parent.authorId);
    },
  },

  Author: {
    books: async (parent: Author) => {
      return await booksTable.findAll((book: Book) => book.authorId === parent.id);
    },
  },
};

export default resolvers;
