import { Db } from "mongodb"
import { createDBMongo } from "../../helpers/createDB_Mongo"
import { IndexesCours } from "../Indexes"
import { schemaCours } from "../Schemas"
import { nanoid } from "nanoid"

const coursDataName = process.env.DATA_COURS
type CoursType = {
  title: string
  prof: string
  categorie: string
  excerpt: string
  description: string
  prix: string
  tags: string[]
  link_image: string
  nbEleves: number
  nbSeances: number
  nbEleveListeAttente: number
  idStripe: string
  dateCreation: Date
  dateUpdate: Date
}

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
    const result = await db
      .collection<CoursType>(coursDataName)
      .findOneAndUpdate({ _id: coursId }, { $set: valToUpdate }, { returnDocument: "after" })
      .then(({ value }) => {
        return value
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête updateOne des cours : ${error}`)
  }
}