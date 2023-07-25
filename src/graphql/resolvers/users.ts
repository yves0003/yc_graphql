import { GraphQLDateTime, GraphQLTime } from "graphql-scalars"
import { users } from "../../DB/Tables.js"
import { Db } from "mongodb"

const createUser = async (
  _parents: any,
  { inputUser }: { inputUser: UserType },
  { db }: { db: Db }
) => {
  try {
    const result = await users.create(db, inputUser)
    return result
  } catch (error) {
    return { messageErrorUserCreateErr: `La création d'un user a échoué : ${error}` }
  }
}

const deleteUser = async (
  _parents: void,
  {
    userId,
  }: {
    userId: string
  },
  { db }: { db: Db }
) => {
  try {
    const result = await users.deleteOne(db, userId)
    return result.deletedCount === 1 ? true : false
  } catch (error) {
    return { messageErrorUserDeleteErr: `La suppression d'un user a échoué : ${error}` }
  }
}

const findOneUser = async (_parents: void, { userId }: { userId: string }, { db }: { db: Db }) => {
  try {
    const result = await users.findOne(db, userId)
    return result
  } catch (error) {
    return { messageErrorUserFindErr: `La recherche d'un user a échoué : ${error}` }
  }
}

const findOneUserByEmail = async (
  _parents: void,
  { email }: { email: string },
  { db }: { db: Db }
) => {
  try {
    const result = await users.findOneByEmail(db, email)
    return result
  } catch (error) {
    return { messageErrorUserFindErr: `La recherche d'un user a échoué : ${error}` }
  }
}

const updateUser = async (
  _parents: any,
  { inputUser, userId }: { inputUser: UserType; userId: string },
  { db }: { db: Db }
) => {
  try {
    const result = await users.updateOne(db, userId, inputUser)
    return result
  } catch (error) {
    return { messageErrorUserUpdateErr: `La mise à jour d'un user a échoué : ${error}` }
  }
}

const userResolvers = {
  UserResult: {
    __resolveType(obj: any) {
      if (obj.messageErrorUserDeleteErr) return "UserDeleteErr"
      if (obj.messageErrorUserUpdateErr) return "UserUpdateErr"
      if (obj.messageErrorUserCreateErr) return "UserCreateErr"
      if (obj.messageErrorUserFindErr) return "UserFindErr"
      if (obj.messageErrorUserFindEmailErr) return "UserFindEmailErr"
      return "User"
    },
  },
  Query: {
    findOneUser,
    findOneUserByEmail,
  },
  Mutation: {
    createUser,
    deleteUser,
    updateUser,
  },
  ISODate: GraphQLDateTime,
  ISOTime: GraphQLTime,
}

export default userResolvers
