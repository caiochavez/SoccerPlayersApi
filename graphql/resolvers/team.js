const Team = require('../../models/Team')

const resolvers = {

  async team ({ id }) {
    try {
      const team = await Team.findById(id).populate('players')
      return team
    } catch (err) {
      return new Error(err)
    }
  },

  async teams ({ page }) {
    try {
      page = page - 1
      const teams = await Team.find().limit(10).skip(10 * page).populate('players')
      return teams
    } catch (err) {
      return new Error(err)
    }
  },

  async createTeam (team) {
    try {
      const teamCreated = await Team.create(team)
      return teamCreated
    } catch (err) {
      return new Error(err)
    }
  }

}

module.exports = resolvers