import { Database } from "fakebase";
const db = new Database("./data/");
const booksTable = db.table("books");
const authorsTable = db.table("authors");
const makeAuthor = async (name) => {
    const author = await authorsTable.create({ name: name });
    return author.id;
};
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Mutation: {
        addBook: async (_, args) => {
            const existingAuthor = await authorsTable.findOne((author) => author.name.toLowerCase() === args.author.toLowerCase());
            const newBook = await booksTable.create({
                title: args.title,
                author: args.author,
                authorId: existingAuthor ? existingAuthor.id : makeAuthor(args.author),
            });
            return newBook;
        },
    },
    Query: {
        book: async (_, args) => {
            return await booksTable.findById(args.id);
        },
        books: async () => {
            // console.log(await booksTable.findAll());
            return await booksTable.findAll();
        },
        author: async (_, args) => {
            return await authorsTable.findById(args.id);
        },
        authors: async () => {
            return await authorsTable.findAll();
        },
    },
    Book: {
        author: async (parent) => {
            return await authorsTable.findById(parent.authorId);
        },
    },
    Author: {
        books: async (parent) => {
            return await booksTable.findAll((book) => book.authorId === parent.id);
        },
    },
};
export default resolvers;
