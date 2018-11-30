const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLList } = require('graphql')
const { playerData } = require('../datastore')

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

const PlayerType = new GraphQLObjectType({
  name: 'player',
  fields: () => ({
    id: type('id'),
    name: type('string'),
    age: type('int'),
    nationality: type('string'),
    position: type('enum'),
    photoData: { type: photoDataType }
  })
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    player: {
      type: PlayerType,
      args: { id: type('id') },
      resolve ( parent, args ) {
        const playerFound = playerData.find(player => player.id === args.id)
        return playerFound
      }
    },
    players: {
      type: new GraphQLList(PlayerType),
      // args: { page: type('int') },
      resolve ( parent, args ) {
        return playerData
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})