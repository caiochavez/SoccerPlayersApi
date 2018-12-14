exports.types = `
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
`

exports.queries = `
  player ( id: ID! ): Player
  players ( page: Int! ): [Player]
`

exports.mutations = `
 createPlayer ( name: String!, age: Int!, nationality: String!, position: Positions!, team: ID! ): Player
`
