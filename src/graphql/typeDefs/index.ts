import { mergeTypeDefs } from "@graphql-tools/merge"
import cours from "./cours"

const types = [cours]

export default mergeTypeDefs(types)
