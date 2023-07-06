import { Db } from "mongodb"
import { createDBMongo } from "../../helpers/createDB_Mongo.js"
import { IndexesCours } from "../Indexes.js"
import { schemaCours } from "../Schemas.js"
import { nanoid } from "nanoid"
import { flattenObject } from "../../helpers/flatternMongoDb.js"

const coursDataName = process.env.DATA_COURS

export const createDB = createDBMongo(IndexesCours, schemaCours, coursDataName)

export const create = async (db: Db, cours: CoursType) => {
  try {
    const _id = nanoid() as any
    const dataToSave = {
      ...cours,
      _id,
      dateCreation: new Date(),
      dateUpdate: new Date(),
    }
    const result = await db
      .collection<CoursType>(coursDataName)
      .insertOne(dataToSave)
      .then(({ insertedId }) => {
        return { ...dataToSave, _id: insertedId }
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenu dans la création d'un cours : ${error}`)
  }
}

export const findOne = async (db: Db, coursId: any) => {
  try {
    const data = await db.collection<CoursType>(coursDataName).findOne({ _id: coursId })
    return data
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête findOne des cours : ${error}`)
  }
}

export const deleteOne = async (db: Db, coursId: any) => {
  try {
    const result = await db.collection<CoursType>(coursDataName).deleteOne({ _id: coursId })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête deleteOne des cours : ${error}`)
  }
}

export const updateOne = async (db: Db, coursId: any, valToUpdate: CoursType) => {
  try {
    valToUpdate.dateUpdate = new Date()
    const flatValToUpdate = flattenObject(valToUpdate)
    const result = await db
      .collection<CoursType>(coursDataName)
      .findOneAndUpdate({ _id: coursId }, { $set: flatValToUpdate }, { returnDocument: "after" })
      .then(({ value }) => {
        return value
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête updateOne des cours : ${error}`)
  }
}
