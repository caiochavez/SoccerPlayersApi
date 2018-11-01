const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  position: {
    type: String,
    enum: ['goalkeeper', 'side', 'defender', 'sock', 'attacker'],
    required: true
  },
  photoData: {
    type: Object
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Player', playerSchema)