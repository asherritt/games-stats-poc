import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { readFileSync } from 'fs';
import { join } from 'path';
import gql from 'graphql-tag';

const typeDefs = gql(
    readFileSync(join(__dirname, 'schema.graphql'), { encoding: 'utf-8' })
);

const resolvers = {
    Query: {
        players: () => [
            { id: '1', username: 'gamer01' },
            { id: '2', username: 'proPlayerX' }
        ]
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

startStandaloneServer(server, {
    listen: { port: 4002 }
}).then(({ url }) => {
    console.log(`🚀 Players subgraph ready at ${url}`);
});