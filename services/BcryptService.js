const bcrypt = require('bcrypt-nodejs')

module.exports = {
  generateHash (password) {
    try {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    } catch (err) {
      return err
    }
  },
  compareHash (passwordBody, passwordDB) {
    try {
      return bcrypt.compareSync(passwordBody, passwordDB, null)
    } catch (err) {
      return err
    }
  }
}
