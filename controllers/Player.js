const Player = require('../models/Player')

module.exports = {
  async create (req, res) {
    try {
      const body = req.body
      const player = await Player.create(body)
      return res.status(201).json(player)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    } 
  },
  async list (req, res) {
    try {
      const name = req.query.name ? req.query.name : ''
      const page = req.query.page - 1 || 0
      const rowsPerPage = req.query.rowsPerPage || 10
      const query = {name: {$regex: name, $options: 'i'}}
      const players = await Player.find(query).limit(rowsPerPage).skip(rowsPerPage * page)
      return res.status(200).json(players)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    }
  },
  async findById (req, res) {
    try {
      const id = req.params.id
      const player = await Player.findById(id)
      return res.status(200).json(player)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    }
  },
  async update (req, res) {
    try {
      const id = req.params.id
      const update = {$set: req.body}
      await Player.findById(id, update)
      res.status(200).json({message: 'Player successfully updated'})
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    }
  },
  async remove (req, res) {
    try {
      const id = req.params.id
      await Player.findByIdAndRemove(id)
      res.status(200).json({message: 'Player successfully removed'})
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    }
  }
}