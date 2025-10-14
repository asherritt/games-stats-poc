import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { readFileSync } from 'fs';
import gql from 'graphql-tag';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = gql(
  readFileSync(join(__dirname, 'schema.graphql'), { encoding: 'utf-8' })
);

const resolvers = {
  Query: {
    games: () => [{ id: '1', title: 'Chess' }]
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

startStandaloneServer(server, {
  listen: { port: 4001 }
}).then(({ url }) => {
  console.log(`🚀 Games subgraph ready at ${url}`);
});
