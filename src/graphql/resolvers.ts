import coursResolvers from "./resolvers/cours.js"
import { mergeResolvers } from "@graphql-tools/merge"
import coursByDateResolvers from "./resolvers/coursbydate.js"

const resolvers = [coursResolvers,coursByDateResolvers]

export default mergeResolvers(resolvers)
