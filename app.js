const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 3000

// Enable Google StackDriver Profiler
require('@google-cloud/profiler').start()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))

// Connect MongoDB
require('./services/MongoDBService')

// Graphql
require('./graphql/index')(app)

// Routes
require('./routes/index')(app)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})