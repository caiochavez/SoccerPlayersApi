const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = require('graphql')

const type = type => {
  switch (type) {
    case 'string':
      return { type: GraphQLString }
    case 'id':
      return  { type: GraphQLID }
  }
}

const usersData = [
  { id: '1', name: 'Caio', dateBirth: '20/02/1997', username: 'caiochavez', password: '123' },
  { id: '2', name: 'Maria', dateBirth: '01/05/1998', username: 'mariamm', password: '456' },
  { id: '3', name: 'Vanessa', dateBirth: '13/11/2000', username: 'nessavan', password: '000' }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: type('string'),
    name: type('string'),
    dateBirth: type('string'),
    username: type('string'),
    password: type('string')
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: type('id') },
      resolve ( parent, args ) {
        const userFound = usersData.find(user => user.id === args.id)
        return userFound
        // code to get data from db / other source
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
