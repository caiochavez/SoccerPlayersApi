const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt } = require('graphql')
const { teamData } = require('../datastore')

const type = type => {
  switch (type) {
    case 'string':
      return { type: GraphQLString }
    case 'id':
      return  { type: GraphQLID }
    case 'int':
      return { type: GraphQLInt }
  }
}

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
        const teamFound = teamData.find(team => team.id === args.id)
        return teamFound
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      // args: { page: type('int') },
      resolve ( parent, args ) {
        return teamData
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})