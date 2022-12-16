import { Database } from "fakebase";

const db = new Database("./data/");
const booksTable = db.table("books");
const authorsTable = db.table("authors");

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

const makeAuthor = async (name: string) => {
  const author = await authorsTable.create({ name: name });
  return author.id;
};

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Mutation: {
    addBook: async (_: any, args: Book) => {
      const existingAuthor = await authorsTable.findOne(
        (author: Author) => author.name.toLowerCase() === args.author.toLowerCase()
      );
      const newBook = await booksTable.create({
        title: args.title,
        author: args.author,
        authorId: existingAuthor ? existingAuthor.id : makeAuthor(args.author),
      });
      return newBook;
    },
  },
  Query: {
    book: async (_: null, args: { id: string }) => {
      return await booksTable.findById(args.id);
    },
    books: async () => {
      // console.log(await booksTable.findAll());
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
