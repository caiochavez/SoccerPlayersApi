const JWTService = require('../../services/JWTService')

module.exports = async token => {
  try {
    const decoded = await JWTService.verify(token)
    if (!decoded) return Promise.reject('Not Authorized')
    return decoded
  } catch (err) {
    return Promise.reject('Not Authorized')
  }
}