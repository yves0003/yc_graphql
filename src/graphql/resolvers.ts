import { mergeResolvers } from "@graphql-tools/merge"
import coursResolvers from "./resolvers/cours.js"
import coursByDateResolvers from "./resolvers/coursbydate.js"
import usersResolvers from "./resolvers/users.js"
<<<<<<< HEAD
import userAdminResolver from "./resolvers/adminUsers.js"

const resolvers = [coursResolvers, coursByDateResolvers, usersResolvers, userAdminResolver]
=======
import eventResolvers from "./resolvers/events.js"

const resolvers = [coursResolvers, coursByDateResolvers, usersResolvers, eventResolvers]
>>>>>>> 20c0338853bc70c40c8265843dcb9e1c7c3fc8c7

export default mergeResolvers(resolvers)
