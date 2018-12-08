const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLEnumType,
  GraphQLInt } = require('graphql')
const Team = require('../../models/Team')

const enumType = new GraphQLEnumType({
  name: 'position',
  values: {
    goalkeeper: { value: 'goalkeeper' },
    side: { value: 'side' },
    defender: { value: 'defender' },
    sock: { value: 'sock' },
    attacker: { value: 'attacker' }
  }
})

const type = type => {
  switch (type) {
    case 'string':
      return { type: GraphQLString }
    case 'id':
      return  { type: GraphQLID }
    case 'int':
      return { type: GraphQLInt }
    case 'enum':
      return { type: enumType }
  }
}

const photoDataType = new GraphQLObjectType({
  name: 'photoData',
  fields: () => ({
    url: type('string')
  })
})

const fields = {
  id: type('id'),
  name: type('string'),
  country: type('string')
  // photoData: { type: photoDataType }
}

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => fields
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    team: {
      type: TeamType,
      args: { id: type('id') },
      async resolve ( parent, { id } ) {
        try {
          const team = await Team.findById(id)
          return team
        } catch (err) {
          return new Error(err)
        }
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      args: { page: type('int') },
      async resolve ( parent, { page } ) {
        try {
          page = page - 1
          const teams = await Team.find().limit(10).skip(10 * page)
          return teams
        } catch (err) {
          return new Error(err)
        }
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTeam: {
      type: TeamType,
      args: fields,
      async resolve ( parent, args ) {
        try {
          const team = await Team.create(args)
          return team
        } catch (err) {
          return new Error(err)
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
})