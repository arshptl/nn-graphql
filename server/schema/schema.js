const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "Random book #1", genre: "Fantasy", id: "4", authorId: "3" },
  { name: "Random book #2", genre: "Fiction", id: "5", authorId: "3" },
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

// types and schemas of the book object(Object Type)
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },

    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      },
    },
    
  }),
});

// types and schema of the author object(Object Type)
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });  
      },
    },
  }),
});

// *Root Queries*, to get into the graphQL(graph) initially to grab data
// how initially we jump into the graph
// The main central hub(network)

// Basically it has different types of queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Query-1
    // Query name
    book: {
      // data of the query
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(books, { id: args.id });
      },
    },

    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
        return books;
      }
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    },

    // Query-2
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // const authors = _.find(authors, { id: args.id });
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
