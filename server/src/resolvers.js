const {
  paginateResults
} = require("./utils");

// don't have to write a resolver for a field if the parent object has a property with the same name.
module.exports = {
  Query: {
    artist: (_, {
        name
      }, {
        dataSources
      }) =>
      dataSources.artistAPI.getArtistByName({
        artistName: name
      }),

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
  },

  Mutation: {
    login: async (_, {
      email
    }, {
      dataSources
    }) => {
      // receives an email address and returns a token if a user exists.
      const user = await dataSources.userAPI.findOrCreateUser({
        email
      });
      if (user) {
        return Buffer.from(email).toString('base64');
      }
    },

    bookTrips: async (_, {
      launchIds
    }, {
      dataSources
    }) => {
      const results = await dataSources.userAPI.bookTrips({
        launchIds
      });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds
      });

      return {
        success: results && results.length === launchIds.length,
        message: results.length === launchIds.length ? `trips booked successfully` : `the following launches couldn't be booked: ${launchIds.filter(id => !results.includes(id)) }`,
        launches

      };
    },

    cancelTrip: async (_, {
      launchId
    }, {
      dataSources
    }) => {
      const result = await dataSources.launchAPI.getLaunchById({
        launchId
      });
      if (!result) {
        return {
          success: false,
          message: 'failed to cancel trip'
        };
      }

      const launch = await dataSources.launchAPI.getLaunchById({
        launchId
      });
      return {
        success: true,
        message: 'trip cancelled',
        launches: [launch]
      }
    }
  },

  Artist: {
    tracks: (artist, _, {
        dataSources
      }) =>
      dataSources.artistAPI.getTracksByArtistId({
        artistId: artist.id
      })
  }
};

// keeping your resolvers thin as a best practice, which allows you to safely refactor without worrying about breaking your API.