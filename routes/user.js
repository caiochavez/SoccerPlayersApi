const User = require('../controllers/User')
const UserAuthentication = require('../policies/UserAuthentication')

module.exports = app => {
  app.post('/user', User.create)
  app.get('/user', UserAuthentication, User.list)
  app.get('/user/:id', UserAuthentication, User.findById)
  app.put('/user/:id', UserAuthentication, User.update)
  app.delete('/user/:id', UserAuthentication, User.remove)
  app.post('/signin', User.signIn)
}