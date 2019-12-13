module.exports = {
    Query: {
        launches: (_, __, {
                dataSources
            }) =>
            dataSources.launchAPI.getAllLaunches(),
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