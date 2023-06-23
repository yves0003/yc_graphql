import { MongoClient } from "mongodb"

export const createDBMongo = (indexes: {}[], schema: {}, database: string) => {
  return async (client: MongoClient) => {
    const exist =
      (await client.db().listCollections().toArray()).findIndex(
        (item: any) => item.name === database
      ) !== -1
    if (!exist) {
      console.log("la table n'existe pas")
      await client.db(process.env.DATABASE_NAME).createCollection(database, {
        capped: false,
        validator: schema,
        validationLevel: "strict",
        validationAction: "error",
      })
      const collection = client
        .db(process.env.DATABASE_NAME)
        .collection(database)
      if (indexes && indexes.length !== 0) {
        await Promise.all(
          indexes.map(async index => {
            await collection.createIndex(index, { unique: true })
          })
        )
      }
    }
  }
}
