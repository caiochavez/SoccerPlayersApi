const graphqlHTTP = require('express-graphql')

const schema = require('./schema/index')
const rootValue = require('./resolvers/index')

module.exports = app => {
  
  app.use (
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue,
      graphiql: true
    })
  )

}
