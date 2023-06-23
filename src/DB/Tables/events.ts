import { Db } from "mongodb"
import { createDBMongo } from "../../helpers/createDB_Mongo"
import { IndexesEvents } from "../Indexes"
import { schemaEvents } from "../Schemas"
import { nanoid } from "nanoid"

const eventDataName = process.env.DATA_EVENTS

type EventType = {
  type: string
  selectedDate: string[]
  dateCreation: Date
  dateDebut: Date
  dateUpdate: Date
  dateFin: Date
  data?: {
    description: {
      eventTitle: string
      categorie: string
      eventLocation: string
    }
    journeePeriode: {
      allDay: boolean
      eventDateDebut: string
      eventHeureDebut: Date
      eventDateFin: string
      eventHeureFin: Date
    }
    ecartType: {
      periodicite: string
    }
    ecartChoix: {
      periodicite: string
      selectedMonthAnnee: string
      nbPeriode: string
      dayHebdo: {
        lun: boolean
        mar: boolean
        mer: boolean
        jeu: boolean
        ven: boolean
        sam: boolean
        dim: boolean
      }
      nbMois: string
    }
    infosCompl: {
      textDescription: string
    }
  }
}

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
    const result = await db
      .collection<EventType>(eventDataName)
      .findOneAndUpdate({ _id: coursId }, { $set: valToUpdate }, { returnDocument: "after" })
      .then(({ value }) => {
        return value
      })
    return result
  } catch (error) {
    throw new Error(`Un problème est survenue dans la requête updateOne des events : ${error}`)
  }
}
