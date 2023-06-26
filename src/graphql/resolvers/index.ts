import coursResolvers from "./cours"
import { mergeResolvers } from "@graphql-tools/merge"

const resolvers = [coursResolvers]

export default mergeResolvers(resolvers)
