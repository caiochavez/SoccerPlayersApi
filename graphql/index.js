const graphqlHTTP = require('express-graphql')
const userSchema = require('./schema/user')
const userResolvers = require('./resolvers/user')

/*
const teamSchema = require('./schema/team')
const playerSchema = require('./schema/player')
*/

module.exports = app => {
  const use = (api, schema, rootValue) => {
    app.use(`/graphql/${api}`, graphqlHTTP({
      schema,
      rootValue,
      graphiql: true
    }))
  }

  use('user', userSchema, userResolvers)
  // use('team', teamSchema)
  // use('player', playerSchema)
}