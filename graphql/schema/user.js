const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = require('graphql')
const User = require('../../models/User')
const BcryptService = require('../../services/BcryptService')
const JWTService = require('../../services/JWTService')

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

const fields = {
  id: type('string'),
  name: type('string'),
  dateBirth: type('string'),
  username: type('string'),
  password: type('string')
}

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => fields
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: type('id') },
      async resolve ( parent, { id } ) {
        try {
          const user = await User.findById(id)
          return user
        } catch (err) {
          return new Error(err)
        }
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: { page: type('int') },
      async resolve ( parent, { page } ) {
        try {
          page = page - 1
          const users = await User.find().limit(10).skip(10 * page)
          return users
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
    createUser: {
      type: UserType,
      args: fields,
      async resolve ( parent, args ) {
        try {
          const user = await User.create(args)
          return user
        } catch (err) {
          return new Error(err)
        }
      }
    },
    signIn:{
      type: UserType,
      args: { username: type('string'), password: type('string') },
      async resolve ( parent, { username, password } ) {
        try {
          const user = await User.find({username})
          if (user) {
            const passwordValid = BcryptService.compareHash(password, user.password)
            if (passwordValid) {
              const token = JWTService.sign(user.toJSON())
              return { user, token }
            } else throw new Error('Invalid credencials')
          } else throw new Error('Invalid credencials')
        } catch (err) {
          return new Error(err)
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
