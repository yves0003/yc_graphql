import { mergeTypeDefs } from "@graphql-tools/merge"
import cours from "./typeDefs/cours.js"
import coursbydate from "./typeDefs/coursbydate.js"
import users from "./typeDefs/users.js"
import adminUsers from "./typeDefs/adminUsers.js"
import events from "./typeDefs/events.js"

const types = [cours, coursbydate, users, events, adminUsers]

export default mergeTypeDefs(types)
