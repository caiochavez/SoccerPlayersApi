const graphqlHTTP = require('express-graphql')

const schema = require('./schema/index')
const rootValue = require('./resolvers/index')

module.exports = app => {
  
  app.use (
    '/graphql',
    graphqlHTTP(( req, res, graphqlParams ) => ({
      schema,
      rootValue,
      graphiql: process.env.NODE_ENV === 'production' ? false : true,
      context: { token: req.headers.authorization }
    }))
  )

}
