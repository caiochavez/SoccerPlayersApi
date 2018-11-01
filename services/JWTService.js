const jwt = require('jsonwebtoken')
const JWTKEY = process.env.JWTKEY || '18uxjet162ejx1t7238xet1728enfx126txfen12tx'

module.exports = {
  sign (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, JWTKEY, {expiresIn: ONE_WEEK})
  },
  verify (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWTKEY, (err, decoded) => {
        if (err) reject(err)
        else resolve(decoded)
      })
    })
  }
}
