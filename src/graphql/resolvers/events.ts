import { GraphQLDateTime, GraphQLTime } from "graphql-scalars"
import { events } from "../../DB/Tables.js"
import { Db } from "mongodb"

const createEvent = async (
  _parents: any,
  { inputEvent }: { inputEvent: EventType },
  { db }: { db: Db }
) => {
  try {
    const result = await events.create(db, inputEvent)
    return result
  } catch (error) {
    return { messageErrorEventCreateErr: `La création d'un event a échoué : ${error}` }
  }
}

const deleteEvent = async (
  _parents: void,
  {
    eventId,
  }: {
    eventId: string
  },
  { db }: { db: Db }
) => {
  try {
    const result = await events.deleteOne(db, eventId)
    return result.deletedCount === 1 ? true : false
  } catch (error) {
    return { messageErrorEventDeleteErr: `La suppression d'un event a échoué : ${error}` }
  }
}

const findOneEvent = async (
  _parents: void,
  { eventId }: { eventId: string },
  { db }: { db: Db }
) => {
  try {
    const result = await events.findOne(db, eventId)
    return result
  } catch (error) {
    return { messageErrorEventFindErr: `La recherche d'un event a échoué : ${error}` }
  }
}

const findAllEvent = async (
  _parents: void,
  arg: void,
  { db }: { db: Db }
) => {
  try {
    const result = await events.findAll(db)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursFindErr: `La recherche de tous les events a échoué : ${error}` }
  }
}

const updateEvent = async (
  _parents: any,
  { inputEvent, eventId }: { inputEvent: EventType; eventId: string },
  { db }: { db: Db }
) => {
  try {
    console.log(inputEvent, "inputEvent")
    const result = await events.updateOne(db, eventId, inputEvent)
    return result
  } catch (error) {
    return { messageErrorEventUpdateErr: `La mise à jour d'un event a échoué : ${error}` }
  }
}

const eventResolvers = {
  EventResult: {
    __resolveType(obj: any) {
      if (obj.messageErrorEventDeleteErr) return "EventDeleteErr"
      if (obj.messageErrorEventUpdateErr) return "EventUpdateErr"
      if (obj.messageErrorEventCreateErr) return "EventCreateErr"
      if (obj.messageErrorEventFindErr) return "EventFindErr"
      return "Event"
    },
  },
  Query: {
    findOneEvent,
    findAllEvent
  },
  Mutation: {
    createEvent,
    deleteEvent,
    updateEvent,
  },
  ISODate: GraphQLDateTime,
  ISOTime: GraphQLTime,
}

export default eventResolvers
