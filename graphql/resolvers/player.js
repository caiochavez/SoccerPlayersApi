const Player = require('../../models/Player')

const resolvers = {

  async player ({ id }) {
    try {
      const player = await Player.findById(id) // populate('team)
      return player
    } catch (err) {
      return new Error(err)
    }
  },

  async players ({ page }) {
    try {
      page = page - 1
      const players = await Player.find().limit(10).skip(10 * page) // populate('team)
      return players
    } catch (err) {
      return new Error(err)
    }
  },

  async createPlayer (player) {
    try {
      const playerCreated = await Player.create(player)
      return playerCreated
    } catch (err) {
      return new Error(err)
    }
  }

}

module.exports = resolvers