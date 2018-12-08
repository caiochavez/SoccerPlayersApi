const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLList } = require('graphql')
const Player = require('../../models/Player')

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
  age: type('int'),
  nationality: type('string'),
  position: type('enum')
  // photoData: { type: photoDataType }
}

const PlayerType = new GraphQLObjectType({
  name: 'player',
  fields: () => fields
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    player: {
      type: PlayerType,
      args: { id: type('id') },
      async resolve ( parent, { id } ) {
        try {
          const player = await Player.findById(id)
          return player
        } catch (err) {
          return new Error(err)
        }
      }
    },
    players: {
      type: new GraphQLList(PlayerType),
      args: { page: type('int') },
      async resolve ( parent, { page } ) {
        try {
          const players = await Player.find().limit(10).skip(10 * page)
          return players
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
    createPlayer: {
      type: PlayerType,
      args: fields,
      async resolve ( parent, args ) {
        try {
          const player = await Player.create(args)
          return player
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
