import { mergeTypeDefs } from "@graphql-tools/merge"
import cours from "./typeDefs/cours.js"
import coursbydate from "./typeDefs/coursbydate.js"
import users from "./typeDefs/users.js"

const types = [cours, coursbydate, users]

export default mergeTypeDefs(types)
