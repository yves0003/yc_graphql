import { mergeTypeDefs } from "@graphql-tools/merge"
import cours from "./typeDefs/cours.js"
import coursbydate from "./typeDefs/coursbydate.js"

const types = [cours,coursbydate]

export default mergeTypeDefs(types)
