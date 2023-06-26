import { Db } from "mongodb"
import { createDBMongo } from "../../helpers/createDB_Mongo.js"
import { IndexesUsers } from "../Indexes.js"
import { schemaUsers } from "../Schemas.js"
import { nanoid } from "nanoid"

const usersDataName = process.env.DATA_USERS
type UserType = {
  name: string
  firstname: string
  numTel: string
  email: string
  dateCreation: Date
  dateUpdate: Date
  dateLastConnexion: Date
  coursPaye: {
    idCours: string
    datePayment: Date
    selectedDate: {
      idCoursbyDate: string
      status: string
      cancelDate: Date
      cancelReason: string
    }
  }[]
}

export const createDB = createDBMongo(IndexesUsers, schemaUsers, usersDataName)
export const create = async (db: Db, user: UserType) => {
  try {
    const _id = nanoid() as any
    const dataToSave = {
      ...user,
      _id,
      dateCreation: new Date(),
      dateUpdate: new Date(),
      dateLastConnexion: new Date(),
    }
    const result = await db
      .collection<UserType>(usersDataName)
      .insertOne(dataToSave)
      .then(({ insertedId }) => {
        return { ...dataToSave, _id: insertedId }
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenu dans la création d'un user : ${error}`)
  }
}

export const findOne = async (db: Db, userId: any) => {
  try {
    const data = await db.collection<UserType>(usersDataName).findOne({ _id: userId })
    return data
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête findOne des users : ${error}`)
  }
}

export const deleteOne = async (db: Db, userId: any) => {
  try {
    const result = await db.collection<UserType>(usersDataName).deleteOne({ _id: userId })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête deleteOne des users : ${error}`)
  }
}

export const updateOne = async (db: Db, userId: any, valToUpdate: UserType) => {
  try {
    valToUpdate.dateUpdate = new Date()
    const result = await db
      .collection<UserType>(usersDataName)
      .findOneAndUpdate({ _id: userId }, { $set: valToUpdate }, { returnDocument: "after" })
      .then(({ value }) => {
        return value
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête updateOne des users : ${error}`)
  }
}
