import { mergeResolvers } from "@graphql-tools/merge"
import coursResolvers from "./resolvers/cours.js"
import coursByDateResolvers from "./resolvers/coursbydate.js"
import usersResolvers from "./resolvers/users.js"
import eventResolvers from "./resolvers/events.js"

const resolvers = [coursResolvers, coursByDateResolvers, usersResolvers, eventResolvers]

export default mergeResolvers(resolvers)
