import { Db } from "mongodb"
import { nanoid } from "nanoid"
import { createDBMongo } from "../../helpers/createDB_Mongo.js"
import logging from "../../Config/logging.js"
import { IndexesAdminUsers } from "../Indexes.js"
import { schemaAdminUser } from "../Schemas.js"
import { verifEmail } from "../../helpers/verif_email.js"

const userAdminDataName = process.env.DATA_ADMINUSERS
type Document = Partial<UserAdminType>

export const createDB = createDBMongo(IndexesAdminUsers, schemaAdminUser, userAdminDataName)

export const add = async (db: Db, input: Document) => {
  try {
    const dataToSave: Document = {
      _id: nanoid(),
      ...input,
      createdAt: new Date(),
      dateUpdate: new Date(),
      userVerifAccount: false,
    }

    const result = await db
      .collection<Document>(userAdminDataName)
      .insertOne(dataToSave)
      .then(({ insertedId }) => {
        return { ...dataToSave, _id: insertedId }
      })
    return result
  } catch (error) {
    throw new Error(`${userAdminDataName}: Un problème est survenu dans l'ajout: ${error}`)
  }
}

export const deleteOne = async (db: Db, _id: string) => {
  try {
    const result = await db.collection<Document>(userAdminDataName).deleteOne({ _id })
    return result
  } catch (error) {
    throw new Error(
      `${userAdminDataName}: Un problème est survenue dans la suppression One: ${error}`
    )
  }
}

export const findOne = async (db: Db, user: Document) => {
  try {
    const data = await db.collection<Document>(userAdminDataName).findOne(user)
    return data ? { ...data, _id: data?._id } : null
  } catch (error) {
    throw new Error(
      `${userAdminDataName}: Un problème est survenue dans la requête findOne: ${error}`
    )
  }
}

export const updateOne = async (db: Db, key: string, valToUpdate: Document) => {
  try {
    valToUpdate.dateUpdate = new Date()
    const dataToUpdate = await db
      .collection<Document>(userAdminDataName)
      .findOneAndUpdate(
        verifEmail(key) ? { userEmail: key } : { _id: key },
        { $set: valToUpdate },
        { returnDocument: "after" }
      )
    return { ...dataToUpdate.value, _id: dataToUpdate!.value!._id }
  } catch (error) {
    throw new Error(
      `${userAdminDataName}: Un problème est survenue dans la requête updateOne: ${error}`
    )
  }
}
export default {
  createDB,
  add,
  deleteOne,
  findOne,
  updateOne,
}
