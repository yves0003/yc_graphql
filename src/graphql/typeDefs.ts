import { mergeTypeDefs } from "@graphql-tools/merge"
import cours from "./typeDefs/cours.js"
import coursbydate from "./typeDefs/coursbydate.js"
import users from "./typeDefs/users.js"
import events from "./typeDefs/events.js"
const types = [cours, coursbydate, users, events]

export default mergeTypeDefs(types)
