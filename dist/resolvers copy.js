// import { Database, Entity } from "fakebase";
// const db = new Database("./data/");
// const booksTable = db.table("books");
// const authorsTable = db.table("authors");
// // TypeScript Types.
// interface Book {
//   id: string;
//   title: string;
//   author: string;
//   authorId: string;
// }
// interface Author {
//   id: string;
//   name: string;
//   books: Book[];
// }
// const makeAuthor = async (name: string) => {
//   const author = await authorsTable.create({ name: name });
//   return author.id;
// };
// // Resolvers define how to fetch the types defined in your schema.
// // This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Mutation: {
//     addBook: async (_: any, args: Book) => {
//       const existingAuthor = await authorsTable.findOne(
//         (author: Author) => author.name.toLowerCase() === args.author.toLowerCase()
//       );
//       const newBook = await booksTable.create({
//         title: args.title,
//         author: args.author,
//         authorId: existingAuthor ? existingAuthor.id : makeAuthor(args.author),
//       });
//       return newBook;
//     },
//   },
//   Query: {
//     book: (_: null, args: { id: string }) => {
//       return booksData.find((book) => book.id === args.id);
//     },
//     books: () => {
//       return booksData;
//     },
//     author: (_: null, args: { id: string }) => {
//       return authorsData.find((author) => author.id === args.id);
//     },
//     authors: () => {
//       return authorsData;
//     },
//   },
//   Book: {
//     author: (parent: Book) => {
//       return authorsData.find((author) => author.id === parent.authorId);
//     },
//   },
//   Author: {
//     books: (parent: Author) => {
//       return booksData.filter((book) => book.authorId === parent.id);
//     },
//   },
// };
// export default resolvers;
