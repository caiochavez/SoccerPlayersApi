const graphqlHTTP = require('express-graphql')
const userSchemaGraphql = require('./schema/user')
const teamSchemaGraphql = require('./schema/team')
const playerSchemaGraphql = require('./schema/player')

module.exports = app => {
  const use = (api, schema) => {
    app.use(`/graphql/${api}`, graphqlHTTP({
      schema,
      graphiql: true
    }))
  }

  use('user', userSchemaGraphql)
  use('team', teamSchemaGraphql)
  use('player', playerSchemaGraphql)
}