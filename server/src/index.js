const {
    ApolloServer
} = require('apollo-server');
const typeDefs = require('./schema');
const {
    createStore
} = require('./utils');

const resolvers = require('./resolvers');

const ArtistAPI = require('./datasources/artist');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore();

// Apollo Server will automatically add the launchAPI and userAPI to our resolvers' context so we can easily call them.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        artistAPI: new ArtistAPI(),
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({
            store
        })
    })
});

server.listen().then(({
    url
}) => {
    console.log(`🚀 Server ready at ${url}`);
});