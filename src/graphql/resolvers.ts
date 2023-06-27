import { mergeResolvers } from "@graphql-tools/merge"
import coursResolvers from "./resolvers/cours.js"
import coursByDateResolvers from "./resolvers/coursbydate.js"
import usersResolvers from "./resolvers/users.js"

const resolvers = [coursResolvers, coursByDateResolvers, usersResolvers]

export default mergeResolvers(resolvers)
