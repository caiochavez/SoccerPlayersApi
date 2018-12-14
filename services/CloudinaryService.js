const cloudinary = require('cloudinary')
cloudinary.config(process.env.CLOUDINARY_URL || '')

module.exports = {
  upload (file) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, data => {
        console.log('Data: ', data)
        const { public_id, url, secure_url } = data
        resolve({ public_id, url, secure_url })
      })
    })
  },
  destroy (public_id) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, result => {
        resolve(result)
      })
    })
  }
}
