exports.types = `
  type User {
    id: ID!
    name: String
    username: String
    dateBirth: String
    password: String
  }

  type SignIn {
    user: User,
    token: String
  }

  type metaData {
    page: Int!
    rowsPerPage: Int!
  }

  type paginationData {
    data: [User]
    meta: metaData
  }
`

exports.queries = `
  user ( id: ID! ): User
  users ( page: Int! ): paginationData
`

exports.mutations = `
  createUser ( name: String!, username: String!, dateBirth: String!, password: String! ): User
  signIn ( username: String!, password: String! ): SignIn
`
