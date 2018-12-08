const graphqlHTTP = require('express-graphql')
const userSchema = require('./schema/user')
const teamSchema = require('./schema/team')
const playerSchema = require('./schema/player')

module.exports = app => {
  const use = (api, schema) => {
    app.use(`/graphql/${api}`, graphqlHTTP({
      schema,
      graphiql: true
    }))
  }

  use('user', userSchema)
  use('team', teamSchema)
  use('player', playerSchema)
}