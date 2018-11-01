const File = require('../controllers/File')
const UserAuthentication = require('../policies/UserAuthentication')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports = app => {
  app.post('/upload', upload.single('picture'), UserAuthentication, File.upload)
}