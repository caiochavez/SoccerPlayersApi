const Team = require('../controllers/Team')
const UserAuthentication = require('../policies/UserAuthentication')

module.exports = app => {
  app.post('/team', UserAuthentication, Team.create)
  app.get('/team', UserAuthentication, Team.list)
  app.get('/team/:id', UserAuthentication, Team.findById)
  app.put('/team/:id', UserAuthentication, Team.update)
  app.delete('/team/:id', UserAuthentication, Team.remove)
}