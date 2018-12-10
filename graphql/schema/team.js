const { buildSchema } = require('graphql')
// const PlayerSchema = require('./player')
// const Player = PlayerSchema.getType('Player')

const schema = buildSchema(`
  type Team {
    id: ID
    name: String
    country: String
    players: [Player]
  }

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
  
  type Query {
    team ( id: ID! ): Team
    teams ( page: Int! ): [Team]
  }

  type Mutation {
    createTeam ( name: String!, country: String! ): Team
  }
`)

module.exports = schema