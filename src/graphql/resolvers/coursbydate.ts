import { GraphQLDateTime, GraphQLTime } from "graphql-scalars"
import { coursbydate } from "../../DB/Tables.js"
import { Db } from "mongodb"

const createCoursByDate = async (
  _parents: any,
  { inputCoursByDate }: { inputCoursByDate: CoursByDateType },
  { db }: { db: Db }
) => {
  try {
    const result = await coursbydate.create(db, inputCoursByDate)
    return result
  } catch (error) {
    return { messageErrorCoursByDateCreateErr: `La création d'un coursbydate a échoué : ${error}` }
  }
}

const deleteCoursByDate = async (
  _parents: void,
  {
    coursByDateId,
  }: {
    coursByDateId: string
  },
  { db }: { db: Db }
) => {
  try {
    const result = await coursbydate.deleteOne(db, coursByDateId)
    return result.deletedCount === 1 ? true : false
  } catch (error) {
    return {
      messageErrorCoursByDateDeleteErr: `La suppression d'un coursbydate a échoué : ${error}`,
    }
  }
}

const findOneCoursByDate = async (
  _parents: void,
  { coursByDateId }: { coursByDateId: string },
  { db }: { db: Db }
) => {
  try {
    const result = await coursbydate.findOne(db, coursByDateId)
    return result
  } catch (error) {
    return { messageErrorCoursByDateFindErr: `La recherche d'un coursbydate a échoué : ${error}` }
  }
}

const updateCoursByDate = async (
  _parents: any,
  { inputCoursByDate, coursByDateId }: { inputCoursByDate: CoursByDateType; coursByDateId: string },
  _context: any,
  _infos: any
) => {
  try {
    const result = await coursbydate.updateOne(_context.db, coursByDateId, inputCoursByDate)
    return result
  } catch (error) {
    return {
      messageErrorCoursByDateUpdateErr: `La mise à jour d'un coursbydate a échoué : ${error}`,
    }
  }
}

const coursByDateResolvers = {
  CoursByDateResult: {
    __resolveType(obj: any) {
      if (obj.messageErrorCoursByDateDeleteErr) return "CoursByDateDeleteErr"
      if (obj.messageErrorCoursByDateUpdateErr) return "CoursByDateUpdateErr"
      if (obj.messageErrorCoursByDateCreateErr) return "CoursByDateCreateErr"
      if (obj.messageErrorCoursByDateFindErr) return "CoursByDateFindErr"
      return "CoursByDate"
    },
  },
  Query: {
    findOneCoursByDate,
  },
  Mutation: {
    createCoursByDate,
    deleteCoursByDate,
    updateCoursByDate,
  },
  ISODate: GraphQLDateTime,
  ISOTime: GraphQLTime,
}

export default coursByDateResolvers
