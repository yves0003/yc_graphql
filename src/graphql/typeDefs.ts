import { mergeTypeDefs } from "@graphql-tools/merge"
import cours from "./typeDefs/cours.js"

const types = [cours]

export default mergeTypeDefs(types)
