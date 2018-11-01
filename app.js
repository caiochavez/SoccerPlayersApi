const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))

// Connect MongoDB
require('./services/MongoDBService')

// Routes
require('./routes/index')(app)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})