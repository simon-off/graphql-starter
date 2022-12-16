import { booksData, authorsData } from "./data.js";
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
        addBook: (_, args) => {
            const existingAuthor = authorsData.find((author) => author.name.toLowerCase() === args.author.toLowerCase());
            const newBook = {
                id: (booksData.length + 1).toString(),
                title: args.title,
                author: args.author,
                authorId: existingAuthor ? existingAuthor.id : makeAuthor(args.author),
            };
            return newBook;
        },
    },
    Query: {
        book: (_, args) => {
            return booksData.find((book) => book.id === args.id);
        },
        books: () => {
            return booksData;
        },
        author: (_, args) => {
            return authorsData.find((author) => author.id === args.id);
        },
        authors: () => {
            return authorsData;
        },
    },
    Book: {
        author: (parent) => {
            return authorsData.find((author) => author.id === parent.authorId);
        },
    },
    Author: {
        books: (parent) => {
            return booksData.filter((book) => book.authorId === parent.id);
        },
    },
};
export default resolvers;
