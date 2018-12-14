const User = require('../../models/User')
const BcryptService = require('../../services/BcryptService')
const JWTService = require('../../services/JWTService')
const isAuthenticated = require('../policies/isAuthenticated')

exports.user = async ({ id }, { token }) => {
  try {
    await isAuthenticated(token)
    const user = await User.findById(id)
    return user
  } catch (err) {
    return new Error(err)
  }
}

exports.users = async ({ page }, { token }) => {
  try {
    await isAuthenticated(token)
    page = page - 1
    const users = await User.find().limit(10).skip(10 * page)
    return users
  } catch (err) {
    return new Error(err)
  }
}

exports.createUser = async ({ name, username, dateBirth, password }, { token }) => {
  try {
    await isAuthenticated(token)
    password = await BcryptService.generateHash(password)
    const userCreated = await User.create({ name, username, dateBirth, password })
    return userCreated
  } catch (err) {
    return new Error(err)
  }
} 

exports.signIn = async ({ username, password }) => {
  try {
    const userFound = await User.findOne({ username })
    if ( userFound ) {
      const passwordValid = BcryptService.compareHash(password, userFound.password)
      if ( passwordValid ) {
        const token = JWTService.sign(userFound.toJSON())
        return { user: userFound, token }
      } else throw new Error('Invalid credencials')
    } else throw new Error('Invalid credencials')
  } catch (err) {
    return new Error(err)
  }
}

