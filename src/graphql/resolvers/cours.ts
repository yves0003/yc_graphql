import { GraphQLDateTime, GraphQLTime } from "graphql-scalars"
import { cours } from "../../DB/Tables.js"
import { Db } from "mongodb"
const createCours = async (
  _parents: any,
  { inputCours }: { inputCours: CoursType },
  { db }: { db: Db }
) => {
  try {
    const result = await cours.create(db, inputCours)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursCreateErr: `La creation d'un cours a échoué : ${error}` }
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
    return { messageErrorCoursDeleteErr: `La suppression d'un cours a échoué : ${error}` }
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
    return { messageErrorCoursFindErr: `La recherche d'un cours a échoué : ${error}` }
  }
}

const findAllCours = async (_parents: void, arg: void, { db }: { db: Db }) => {
  try {
    const result = await cours.findAll(db)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursFindErr: `La recherche de tous les cours a échoué : ${error}` }
  }
}

const updateCours = async (
  _parents: any,
  { inputCours, coursId }: { inputCours: CoursType; coursId: string },
  _context: any,
  _infos: any
) => {
  try {
    // if (inputCours.dateDebut) {
    //   inputCours.dateDebut = new Date(inputCours.dateDebut)
    // }
    // if (inputCours.dateFin) {
    //   inputCours.dateFin = new Date(inputCours.dateFin)
    // }
    const result = await cours.updateOne(_context.db, coursId, inputCours)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursUpdateErr: `La mise à jour d'un cours a échoué : ${error}` }
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
    findAllCours,
  },
  Mutation: {
    createCours,
    deleteCours,
    updateCours,
  },
  ISODate: GraphQLDateTime,
  ISOTime: GraphQLTime,
}

export default coursResolvers
