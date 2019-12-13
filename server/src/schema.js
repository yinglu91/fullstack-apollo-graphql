const {
    gql
} = require('apollo-server');
/* Apollo Server is a library that helps you build a production-ready graph API over your data. It can connect to any data source, including REST APIs and databases, and it seamlessly integrates with Apollo developer tooling.
 */

// Create a blueprint for your graph's data
// a schema is a blueprint for all of the data you can access in your graph.
// that describes all of your data's types and their relationships.
const typeDefs = gql `
    # schema below using GraphQL's schema definition language (SDL)

    # Query type, which is the entry point into our schema 
    # that describes what data we can fetch.
    # all types in GraphQL are nullable by default
    type Query {
        launches(
          """
          The number of results to show. Must be >= 1. Default = 20
          """
          pageSize: Int
          """
          If you add a cursor here, it will only return results _after_ this cursor
          """
          after: String
        ): LaunchConnection!
        launch(id: ID!): Launch
        me: User
      }

    # GraphQL object type

    # primitive type like ID, String, Boolean, or Int, 
    # custom scalars like Date

    type LaunchConnection { 
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
      }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    # Mutation type is the entry point into our graph for modifying data. 
    # Just like the Query type, the Mutation type is a special object type.
    type Mutation {
        # if false, booking trips failed -- check errors
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
      
        # if false, cancellation failed -- check errors
        cancelTrip(launchId: ID!): TripUpdateResponse!
      
        login(email: String): String # login token
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String

        # It's always good practice to return the data 
        # that you're updating in order for the Apollo Client cache to 
        # update automatically.
        launches: [Launch]
    }

`;

module.exports = typeDefs;