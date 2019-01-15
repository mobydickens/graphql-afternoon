const { GraphQLServer } = require('graphql-yoga');
const { readFileSync } = require('fs');

const resolvers = require('./schema/resolvers');
const typeDefs = readFileSync(`${__dirname}/schema/typeDefs.graphql`, 'utf8');

const options = {
  port: 3001,
  endpoing: `/graphql`,
  playground: `/graphiql`
}

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})

server.start(options, () => console.log(`server is running at port ${options.port}`));