import "dotenv/config"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import express from "express"
import http from "http"
import cors from "cors"
import { ConnectToDB } from "./DB/connect.js"
import { makeExecutableSchema } from "@graphql-tools/schema"
import typeDefs from "./graphql/typeDefs.js"
import resolvers from "./graphql/resolvers.js"
import { refreshTokenRoute } from "./routes/refresh_tokenH.js"
import { verifTokenRoute } from "./routes/verif_tokenH.js"
import { sendemailRoute } from "./routes/saveEmailSendinBlue.js"
import cookieParser from 'cookie-parser'

const { db } = await ConnectToDB()
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
await server.start()
app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: ["http://localhost:3001","https://www.your-app.example", "https://studio.apollographql.com"], credentials: true }))
app.use("/", refreshTokenRoute(db))
app.use("/", verifTokenRoute)
app.use("/", sendemailRoute)

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      try {
        return { db, req, res }
      } catch (error) {
        throw new Error(error)
      }
    },
  })
)

const port = process.env.SERVER_PORT || 4001
await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
