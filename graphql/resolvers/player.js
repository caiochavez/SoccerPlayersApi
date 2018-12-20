const Player = require('../../models/Player')
const Team = require('../../models/Team')
const isAuthenticated = require('../policies/isAuthenticated')

exports.player = async ({ id }, { token }) => {
  try {
    await isAuthenticated(token)
    const player = await Player.findById(id).populate('team')
    return player
  } catch (err) {
    return new Error(err)
  }
}

exports.players = async ({ page }, { token }) => {
  try {
    await isAuthenticated(token)
    page = page - 1
    const players = await Player.find().limit(10).skip(10 * page).populate('team')
    return players
  } catch (err) {
    return new Error(err)
  }
}

exports.createPlayer = async (player, { token }) => {
  try {
    await isAuthenticated(token)
    const playerCreated = await Player.create(player)
    const { _id: playerId, team: teamId } = playerCreated
    await Team.findByIdAndUpdate(teamId, { $push: { players: playerId } })
    return playerCreated
  } catch (err) {
    return new Error(err)
  }
}
