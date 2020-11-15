const graphql = require('graphql');
const _ = require('lodash');
// Our schema describes the data of the graph(relationshions and whatnot)
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt } = graphql;

// dummy data
const books = [
  { name: 'hey', id: '1' },
  { name: 'heyyyy', id: '2' },
  { name: 'heyyyy', id: '3' },
];

const authors = [
  { name: 'Cole McCoy', age: 500, id: '1' },
  { name: 'Michael Shuff', age: 34, id: '2' },
  { name: 'Mark McClatchy', age: 18, id: '3' },
];

// Every Book has an Author, Every Author has a Collection of Books

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    /* book(id: '123') {
        name
        genre
      } */
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source (i.e. args.id)
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
