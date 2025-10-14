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
        stats: () => [
            { id: '1', playerId: '1', gameId: '1', score: 4200 },
            { id: '2', playerId: '2', gameId: '1', score: 3800 }
        ]
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

startStandaloneServer(server, {
    listen: { port: 4003 }
}).then(({ url }) => {
    console.log(`🚀 Stats subgraph ready at ${url}`);
});