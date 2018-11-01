module.exports = app => {
  require('./player')(app)
  require('./user')(app)
  require('./team')(app)
  require('./file')(app)
}



