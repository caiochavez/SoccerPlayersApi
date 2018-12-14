const User = require('./user')
const Team = require('./team')
const Player = require('./player')

const resolvers = {
  ...User,
  ...Team,
  ...Player
}

module.exports = resolvers