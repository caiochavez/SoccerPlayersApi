const mongoose = require('mongoose')
try {
  const MONGODB_URI = process.env.MONGODB_URI
  mongoose.connect(MONGODB_URI ? MONGODB_URI : 'mongodb://localhost/soccerplayers')
  mongoose.Error.messages.general.required = "The attribute '{PATH}' is required"
  mongoose.Error.messages.Number.min = "The '{VALUE}' reported is less than the minimun threshold of '{MIN}'"
  mongoose.Error.messages.Number.max = "The '{VALUE}' reported is greater than the maximun limit of '{MAX}'"
  mongoose.Error.messages.String.enum = "'{VALUE}' is not valid for attribute '{PATH}'"
} catch (err) {
  throw err
}