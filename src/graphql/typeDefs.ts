import { mergeTypeDefs } from "@graphql-tools/merge"
import cours from "./typeDefs/cours.js"
import coursbydate from "./typeDefs/coursbydate.js"
import users from "./typeDefs/users.js"
<<<<<<< HEAD
import adminUsers from "./typeDefs/adminUsers.js"

const types = [cours, coursbydate, users, adminUsers]
=======
import events from "./typeDefs/events.js"
const types = [cours, coursbydate, users, events]
>>>>>>> 20c0338853bc70c40c8265843dcb9e1c7c3fc8c7

export default mergeTypeDefs(types)
