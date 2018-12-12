const { buildSchema } = require('graphql')

const schema = buildSchema(`
  directive @isAuthenticated on QUERY | FIELD | FIELD_DEFINITION
  directive @hasScope(scope: [String]) on QUERY | FIELD | FIELD_DEFINITION

  type User {
    id: ID
    name: String
    username: String
    dateBirth: String
    password: String
  }

  type SignIn {
    user: User,
    token: String
  }

  type Query {
    user ( id: ID! ): User
    users ( page: Int!, token: String! ): [User]
  }

  type Mutation {
    createUser ( name: String!, username: String!, dateBirth: String!, password: String! ): User
    signIn ( username: String!, password: String! ): SignIn
  }
`)

module.exports = schema
