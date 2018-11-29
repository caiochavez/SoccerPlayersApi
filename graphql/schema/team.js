const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = require('graphql')

const type = type => {
  switch (type) {
    case 'string':
      return { type: GraphQLString }
    case 'id':
      return  { type: GraphQLID }
  }
}

const teamsData = [
  {
    id: '1',
    name: 'Barcelona',
    country: 'Espanha',
    photoData: { url: 'barcelona.png' }
  },
  {
    id: '2',
    name: 'Real Madrid',
    country: 'Espanha',
    photoData: { url: 'realmadrid.png' }
  }
]

const photoDataType = new GraphQLObjectType({
  name: 'photoData',
  fields: () => ({
    url: type('string')
  })
})

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: type('id'),
    name: type('string'),
    country: type('string'),
    photoData: { type: photoDataType }
  })
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    team: {
      type: TeamType,
      args: { id: type('id') },
      resolve ( parent, args ) {
        const teamFound = teamsData.find(team => team.id === args.id)
        return teamFound
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})