const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  pictureData: {
    type: Object
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Team', teamSchema)