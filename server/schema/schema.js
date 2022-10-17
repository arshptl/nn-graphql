const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    genre: { type: graphql.GraphQLString },
  }),
});


// Root Queries, to get into the graphQL(graph) initially to grab data
const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            
        }
    }
})
