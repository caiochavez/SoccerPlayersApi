const User = require('../models/User')
const BcryptService = require('../services/BcryptService')
const JWTService = require('../services/JWTService')

module.exports = {
  async create (req, res) {
    try {
      const body = req.body
      if (!body.password) return res.status(400).json({message: 'Missing parameters'})
      body.password = await BcryptService.generateHash(body.password)
      const user = await User.create(body)
      res.status(201).json(user)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  },
  async list (req, res) {
    try {
      const name = req.query.name ? req.query.name : ''
      const page = req.query.page - 1 || 0
      const rowsPerPage = req.query.rowsPerPage || 10
      const query = {name: {$regex: name, $options: 'i'}}
      const users = await User.find(query).limit(rowsPerPage).skip(rowsPerPage * page)
      res.status(200).json(users)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  },
  async findById (req, res) {
    try {
      const id = req.params.id
      const fields = {password: false}
      const user = await User.findById(id, fields)
      res.status(200).json(user)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  },
  async update (req, res) {
    try {
      const id = req.params.id
      const update = {$set: req.body}
      await User.findByIdAndUpdate(id, update)
      res.status(200).json({message: 'User successfully updated'})
    } catch(err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  },
  async remove (req, res) {
    try {
      const id = req.params.id
      await User.findByIdAndRemove(id)
      res.status(200).json({message: 'User successfully removed'})
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  },
  async signIn (req, res) {
    try {
      if (!req.body.username || !req.body.password) return res.status(400).json({message: 'Missing attributes'})
      const { username, password } = req.body
      const query = {username}
      const user = await User.findOne(query)
      if (user) {
        const passwordValid = BcryptService.compareHash(password, user.password)
        if (passwordValid) {
          const token = JWTService.sign(user.toJSON())
          res.status(200).json({user, token})
        } else {
          res.status(400).json({message: 'Invalid credentials'})
        }
      } else {
        res.status(400).json({message: 'Invalid credentials'})
      }
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      res.status(500).json(objError)
    }
  }
}
