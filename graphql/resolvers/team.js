const Team = require('../../models/Team')
const isAuthenticated = require('../policies/isAuthenticated')

exports.team = async ({ id }, { token }) => {
  try {
    await isAuthenticated(token)
    const team = await Team.findById(id).populate('players')
    return team
  } catch (err) {
    return new Error(err)
  }
}

exports.teams = async ({ page }, { token }) => {
  try {
    await isAuthenticated(token)
    page = page - 1
    const teams = await Team.find().limit(10).skip(10 * page).populate('players')
    return teams
  } catch (err) {
    return new Error(err)
  }
}

exports.createTeam = async (team, { token }) => {
  try {
    await isAuthenticated(token)
    const teamCreated = await Team.create(team)
    return teamCreated
  } catch (err) {
    return new Error(err)
  }
}
