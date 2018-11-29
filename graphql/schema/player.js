const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLEnumType } = require('graphql')

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

const playersData = [
  {
    id: '1',
    name: 'Neymar',
    age: 24,
    nationality: 'Brasil',
    position: 'attacker',
    photoData: { url: 'neymar.png' }
  },
  {
    id: '2',
    name: 'Messi',
    age: 31,
    nationality: 'Argentina',
    position: 'attacker',
    photoData: { url: 'messi.png' }
  }
]

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
        const playerFound = playersData.find(player => player.id === args.id)
        return playerFound
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})