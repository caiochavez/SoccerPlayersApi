const Team = require('../../models/Team')

exports.team = async ({ id }) => {
  try {
    const team = await Team.findById(id).populate('players')
    return team
  } catch (err) {
    return new Error(err)
  }
}

exports.teams = async ({ page }) => {
  try {
    page = page - 1
    const teams = await Team.find().limit(10).skip(10 * page).populate('players')
    return teams
  } catch (err) {
    return new Error(err)
  }
}

exports.createTeam = async team => {
  try {
    const teamCreated = await Team.create(team)
    return teamCreated
  } catch (err) {
    return new Error(err)
  }
}
