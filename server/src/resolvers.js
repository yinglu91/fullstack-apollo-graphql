const {
    paginateResults
} = require('./utils');

// don't have to write a resolver for a field if the parent object has a property with the same name.
module.exports = {
    Query: {
        launches: async (_, {
            pageSize = 20,
            after
        }, {
            dataSources
        }) => {
            const allLaunches = await dataSources.launchAPI.getAllLaunches();
            // we want these in reverse chronological order
            allLaunches.reverse();
            const launches = paginateResults({
                after,
                pageSize,
                results: allLaunches
            });
            return {
                launches,
                cursor: launches.length ? launches[launches.length - 1].cursor : null,
                // if the cursor of the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: launches.length ?
                    launches[launches.length - 1].cursor !==
                    allLaunches[allLaunches.length - 1].cursor : false
            };
        },
        launch: (_, {
                id
            }, {
                dataSources
            }) =>
            dataSources.launchAPI.getLaunchById({
                launchId: id
            }),
        me: (_, __, {
            dataSources
        }) => dataSources.userAPI.findOrCreateUser()
    }
};

// keeping your resolvers thin as a best practice, which allows you to safely refactor without worrying about breaking your API.