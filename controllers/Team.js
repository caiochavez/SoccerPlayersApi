const Team = require('../models/Team')

module.exports = {
  async create (req, res) {
    try {
      const body = req.body
      const team = await Team.create(body)
      return res.status(201).json(team)
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
      const teams = await Team.find(query).limit(rowsPerPage).skip(rowsPerPage * page)
      return res.status(200).json(teams)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    }
  },
  async findById (req, res) {
    try {
      const id = req.params.id
      const team = await Team.findById(id)
      return res.status(200).json(team)
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    }
  },
  async update (req, res) {
    try {
      const id = req.params.id
      const update = {$set: req.body}
      await Team.findByIdAndUpdate(id, update)
      return res.status(200).json({message: 'Team successfully updated'})
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    }
  },
  async remove (req, res) {
    try {
      const id = req.params.id
      await Team.findByIdAndRemove(id)
      return res.status(200).json({message: 'Team successfully removed'})
    } catch (err) {
      const objError = {error: {errorName: err.name, errorMessage: err.message}}
      return res.status(500).json(objError)
    }
  }
}