import { GraphQLDateTime } from "graphql-scalars"
import { cours } from "../../DB/Tables.js"
import { Db } from "mongodb"
const createCours = async (
  _parents: any,
  { inputCours }: { inputCours: CoursType },
  { db }: { db: Db }
) => {
  try {
    const result = await cours.create(db, inputCours)
    console.log(result, "rteste")
    return result
  } catch (error) {
    console.log(error)
    return { createCours: "error" }
  }
}
const deleteCours = async (
  _parents: void,
  {
    coursId,
  }: {
    coursId: string
  },
  { db }: { db: Db }
) => {
  try {
    const result = await cours.deleteOne(db, coursId)
    return result.deletedCount === 1 ? true : false
  } catch (error) {
    console.log(error)
    return { deleteCours: "error" }
  }
}

const findOneCours = async (
  _parents: void,
  { coursId }: { coursId: string },
  { db }: { db: Db }
) => {
  try {
    const result = await cours.findOne(db, coursId)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursFindErr: "error" }
  }
}

const updateCours = async (
  _parents: any,
  { inputCours }: { inputCours: CoursType },
  _context: any,
  _infos: any
) => {
  try {
    const result = await cours.updateOne(_context.db, inputCours._id, inputCours)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursUpdateErr: "error" }
  }
}

const coursResolvers = {
  CoursResult: {
    __resolveType(obj: any) {
      if (obj.messageErrorCoursDeleteErr) return "messageErrorCoursDeleteErr"
      if (obj.messageErrorCoursUpdateErr) return "messageErrorCoursUpdateErr"
      if (obj.messageErrorCoursCreateErr) return "messageErrorCoursCreateErr"
      if (obj.messageErrorCoursFindErr) return "messageErrorCoursFindErr"
      return "Cours"
    },
  },
  Query: {
    findOneCours,
  },
  Mutation: {
    createCours,
    deleteCours,
    updateCours,
  },
  ISODate: GraphQLDateTime,
}

export default coursResolvers