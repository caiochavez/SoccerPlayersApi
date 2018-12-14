const { buildSchema } = require('graphql')
const { types: typesUser, queries: queriesUser, mutations: mutationsUser } = require('./user')
const { types: typesTeam, queries: queriesTeam, mutations: mutationsTeam } = require('./team')
const { types: typesPlayer, queries: queriesPlayer, mutations: mutationsPlayer } = require('./player')

const schema = buildSchema(`

  ${typesUser}
  ${typesTeam}
  ${typesPlayer}

  type Query {
    ${queriesUser}
    ${queriesTeam}
    ${queriesPlayer}
  }

  type Mutation {
    ${mutationsUser}
    ${mutationsTeam}
    ${mutationsPlayer}
  }

`)

module.exports = schema

