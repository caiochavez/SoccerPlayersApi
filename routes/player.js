const UserAuthentication = require('../policies/UserAuthentication')
const Player = require('../controllers/Player')

module.exports = app => {
  app.post('/player', UserAuthentication, Player.create)
  app.get('/player', UserAuthentication, Player.list)
  app.get('/player/:id', UserAuthentication, Player.findById)
  app.put('/player/:id', UserAuthentication, Player.update)
  app.delete('/player/:id', UserAuthentication, Player.remove)
}