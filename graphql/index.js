const graphqlHTTP = require('express-graphql')
// Schemas
const userSchema = require('./schema/user')
const teamSchema = require('./schema/team')
const playerSchema = require('./schema/player')
// Resolvers
const userResolvers = require('./resolvers/user')
const teamResolvers  = require('./resolvers/team')
const playerResolvers = require('./resolvers/player')

module.exports = app => {
  const use = (api, schema, rootValue) => {
    app.use(`/graphql/${api}`, graphqlHTTP({
      schema,
      rootValue,
      graphiql: true
    }))
  }

  use('user', userSchema, userResolvers)
  use('team', teamSchema, teamResolvers)
  use('player', playerSchema, playerResolvers)
}