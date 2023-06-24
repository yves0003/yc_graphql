import { GraphQLDateTime } from "graphql-scalars"
import { cours } from "../../DB/Tables"
import { Db } from "mongodb"
export const createCours = async (
  _parents: any,
  { inputCours }: { inputCours: CoursType },
  { db }: { db: Db }
) => {
  const result = await cours.create(db, inputCours)
  return result
}
export const deleteCours = async (
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
    return error
  }
}

export const findOneCours = async (
  _parents: void,
  { coursId }: { coursId: string },
  { db }: { db: Db }
) => {
  try {
    const result = await cours.findOne(db, coursId)
    return result
  } catch (error) {
    return error
  }
}
