const shell = require('shelljs')
const CloudinaryService = require('../services/CloudinaryService')

module.exports = {
  async upload (req, res) {
    try {
      const { type, id } = req.query
      if (!id || !type || type !== 'player' || type || 'team') return res.status(400).json({message: 'Missing parameters'})
      const file = req.file
      const cloudinary = await CloudinaryService.upload(file.path)
      let result = {}
      const update = {$set: {photoData: cloudinary}}
      if (type === 'player') {
        const Player = require('../models/Player')
        const playerUpdated = await Player.findByIdAndUpdate(id, update, {new: true})
        result = playerUpdated.photoData
      } else {
        const Team = require('../models/Team')
        const teamUpdated = await Team.findByIdAndUpdate(id, update, {new: true})
        result = teamUpdated.photoData
      }
      const pwd = shell.pwd()
      shell.rm('-rf', `${pwd.stdout}/uploads/${file.filename}`)
      return res.status(200).json(result)
    } catch (err) {
      const objError = { error: { errorName: err.name, errorMessage: err.message } }
      return res.status(500).json(objError)
    }
  }
}