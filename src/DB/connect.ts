import { MongoClient } from "mongodb"
import { cours, coursbydate, events, users } from "./Tables"
import * as logging from "../Config/logging"
const NAMESPACE = "CONNECT_DB"

const client =
  new MongoClient(process.env.DATABASE_URL, {
    connectTimeoutMS: 10000,
  }) || null

export const ConnectToDB = async () => {
  try {
    await client.connect()
    await cours.createDB(client)
    await coursbydate.createDB(client)
    await users.createDB(client)
    await events.createDB(client)
    const db = client.db(process.env.DATABASE_NAME)
    logging.info(NAMESPACE, `Connecté à la base ${process.env.DATABASE_NAME}`)
    return { db, dbClient: client }
  } catch (error) {
    logging.info(NAMESPACE, `Error sur la base ${process.env.DATABASE_NAME}`, error)
  }
}
