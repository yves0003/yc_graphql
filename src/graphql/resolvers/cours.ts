import { GraphQLDateTime, GraphQLTime } from "graphql-scalars"
import { cours } from "../../DB/Tables.js"
import { Db } from "mongodb"
import Stripe from "stripe"

const createCours = async (
  _parents: any,
  { inputCours }: { inputCours: CoursType },
  { db }: { db: Db }
) => {
  try {
    const stripe = new Stripe(
      "sk_test_51NWEZoBNeSlpSP9rnEyGXoKp8BS5IrNYg08CqxYw0gRKsT1m1OYkD6Ix2JfNfV9cv3DXn9pNmSv6P2odjOS0NnfU00pSqXuyrp",
      {
        apiVersion: "2022-11-15",
      }
    )
    const product = await stripe.products.create({
      name: `${inputCours.title}${
        Number(inputCours.nbEleves) > 1 ? ` (${inputCours.nbEleves} séances)` : ""
      }`,
      active: true,
      description: inputCours.excerpt,
      images: [inputCours.link_image],
      statement_descriptor: "YC WORKSHOP",
    })
    let price
    if (inputCours.isAbonnement) {
      price = await stripe.prices.create({
        unit_amount: Number(inputCours.prix) * 100,
        active: true,
        currency: "eur",
        product: product.id,
        recurring: { interval: "month", interval_count: 1, usage_type: "licensed" },
      })
    } else {
      price = await stripe.prices.create({
        unit_amount: Number(inputCours.prix),
        currency: "eur",
        active: true,
        product: product.id,
      })
    }

    const result = await cours.create(db, { ...inputCours, idStripe: price })
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursCreateErr: `La creation d'un cours a échoué : ${error}` }
  }
}
const deleteCours = async (
  _parents: void,
  {
    coursId,
  }: {
    coursId: string
  },
  { db }: { db: Db }
) => {
  try {
    const result = await cours.deleteOne(db, coursId)
    return result.deletedCount === 1 ? true : false
  } catch (error) {
    console.log(error)
    return { messageErrorCoursDeleteErr: `La suppression d'un cours a échoué : ${error}` }
  }
}

const findOneCours = async (
  _parents: void,
  { coursId }: { coursId: string },
  { db }: { db: Db }
) => {
  try {
    const result = await cours.findOne(db, coursId)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursFindErr: `La recherche d'un cours a échoué : ${error}` }
  }
}

const findAllCours = async (_parents: void, arg: void, { db }: { db: Db }) => {
  try {
    const result = await cours.findAll(db)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursFindErr: `La recherche de tous les cours a échoué : ${error}` }
  }
}

const updateCours = async (
  _parents: any,
  { inputCours, coursId }: { inputCours: CoursType; coursId: string },
  _context: any,
  _infos: any
) => {
  try {
    // if (inputCours.dateDebut) {
    //   inputCours.dateDebut = new Date(inputCours.dateDebut)
    // }
    // if (inputCours.dateFin) {
    //   inputCours.dateFin = new Date(inputCours.dateFin)
    // }
    const result = await cours.updateOne(_context.db, coursId, inputCours)
    return result
  } catch (error) {
    console.log(error)
    return { messageErrorCoursUpdateErr: `La mise à jour d'un cours a échoué : ${error}` }
  }
}

const coursResolvers = {
  CoursResult: {
    __resolveType(obj: any) {
      if (obj.messageErrorCoursDeleteErr) return "messageErrorCoursDeleteErr"
      if (obj.messageErrorCoursUpdateErr) return "messageErrorCoursUpdateErr"
      if (obj.messageErrorCoursCreateErr) return "messageErrorCoursCreateErr"
      if (obj.messageErrorCoursFindErr) return "messageErrorCoursFindErr"
      return "Cours"
    },
  },
  Query: {
    findOneCours,
    findAllCours,
  },
  Mutation: {
    createCours,
    deleteCours,
    updateCours,
  },
  ISODate: GraphQLDateTime,
  ISOTime: GraphQLTime,
}

export default coursResolvers
