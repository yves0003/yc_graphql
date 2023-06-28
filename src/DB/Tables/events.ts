import { Db } from "mongodb"
import { createDBMongo } from "../../helpers/createDB_Mongo.js"
import { IndexesEvents } from "../Indexes.js"
import { schemaEvents } from "../Schemas.js"
import { nanoid } from "nanoid"
import { flattenObject } from "../../helpers/flatternMongoDb.js"

const eventDataName = process.env.DATA_EVENTS

export const createDB = createDBMongo(IndexesEvents, schemaEvents, eventDataName)

export const create = async (db: Db, event: EventType) => {
  try {
    const _id = nanoid() as any
    const dataToSave = {
      ...event,
      _id,
      dateCreation: new Date(),
      dateUpdate: new Date(),
    }
    console.log(dataToSave)
    const result = await db
      .collection(eventDataName)
      .insertOne(dataToSave)
      .then(({ insertedId }) => {
        return { ...dataToSave, _id: insertedId }
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenu dans la création d'un event : ${error}`)
  }
}

export const findOne = async (db: Db, eventId: any) => {
  try {
    const data = await db.collection<EventType>(eventDataName).findOne({ _id: eventId })
    return data
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête findOne des events : ${error}`)
  }
}

export const deleteOne = async (db: Db, coursId: any) => {
  try {
    const result = await db.collection<EventType>(eventDataName).deleteOne({ _id: coursId })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête deleteOne des events : ${error}`)
  }
}

export const updateOne = async (db: Db, coursId: any, valToUpdate: EventType) => {
  try {
    valToUpdate.dateUpdate = new Date()
    const flatValToUpdate = flattenObject(valToUpdate)
    const result = await db
      .collection<EventType>(eventDataName)
      .findOneAndUpdate({ _id: coursId }, { $set: flatValToUpdate }, { returnDocument: "after" })
      .then(({ value }) => {
        return value
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête updateOne des events : ${error}`)
  }
}
