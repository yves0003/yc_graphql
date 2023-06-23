import { Db } from "mongodb"
import { createDBMongo } from "../../helpers/createDB_Mongo"
import { IndexesCoursByDate } from "../Indexes"
import { schemaCoursByDate } from "../Schemas"
import { nanoid } from "nanoid"

const coursbydateDataName = process.env.DATA_COURSBYDATE
type CoursByDateType = {
  dateJ: Date
  idEvent: string
  listInscrit: string[]
  listInteressee: []
  status: string
  eventHeureDebut: Date
  eventHeureFin: Date
  dateCreation: Date
  dateUpdate: Date
}

export const createDB = createDBMongo(IndexesCoursByDate, schemaCoursByDate, coursbydateDataName)

export const create = async (db: Db, cours: CoursByDateType) => {
  try {
    const _id = nanoid() as any
    const dataToSave = {
      ...cours,
      _id,
      dateCreation: new Date(),
      dateUpdate: new Date(),
    }
    const result = await db
      .collection<CoursByDateType>(coursbydateDataName)
      .insertOne(dataToSave)
      .then(({ insertedId }) => {
        return { ...dataToSave, _id: insertedId }
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenu dans la création d'un coursbydate : ${error}`)
  }
}

export const findOne = async (db: Db, coursId: any) => {
  try {
    const data = await db.collection<CoursByDateType>(coursbydateDataName).findOne({ _id: coursId })
    return data
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête findOne des coursbydate : ${error}`)
  }
}

export const deleteOne = async (db: Db, coursId: any) => {
  try {
    const result = await db
      .collection<CoursByDateType>(coursbydateDataName)
      .deleteOne({ _id: coursId })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête deleteOne des coursbydate : ${error}`)
  }
}

export const updateOne = async (db: Db, coursId: any, valToUpdate: CoursByDateType) => {
  try {
    valToUpdate.dateUpdate = new Date()
    const result = await db
      .collection<CoursByDateType>(coursbydateDataName)
      .findOneAndUpdate({ _id: coursId }, { $set: valToUpdate }, { returnDocument: "after" })
      .then(({ value }) => {
        return value
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête updateOne des coursbydate : ${error}`)
  }
}
