import coursResolvers from "./resolvers/cours.js"
import { mergeResolvers } from "@graphql-tools/merge"

const resolvers = [coursResolvers]

export default mergeResolvers(resolvers)
