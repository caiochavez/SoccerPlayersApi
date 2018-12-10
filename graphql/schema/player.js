const { buildSchema } = require('graphql')
// const TeamSchema = require('./team')
// const Team = TeamSchema.getType('Team')

const schema = buildSchema(`
  type Player {
    id: ID,
    name: String
    age: Int
    nationality: String
    position: Positions
    team: Team
  }

  enum Positions {
    goalkeeper
    side
    defender
    sock
    attacker
  }

  type Team {
    id: ID
    name: String
    country: String
    players: [Player]
  }

  type Query {
    player ( id: ID! ): Player
    players ( page: Int! ): [Player]
  }

  type Mutation {
    createPlayer ( name: String!, age: Int!, nationality: String!, position: Positions!, team: ID! ): Player
  }
`)

module.exports = schema
