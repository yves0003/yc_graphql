export default /* GraphQL */ `
  scalar ISODate
  scalar ISOTime

  type CoursByDate {
    _id: String!
    dateJ: ISODate
    title: String
    idEvent: String
    listInscrit: [String]
    listInteressee: [String]
    status: String
    eventHeureDebut: ISOTime
    eventHeureFin: ISOTime
    dateCreation: ISODate
    dateUpdate: ISODate
  }

  input CoursByDateInput {
    dateJ: ISODate
    idEvent: String
    title: String
    listInscrit: [String]
    listInteressee: [String]
    status: String
    eventHeureDebut: ISOTime
    eventHeureFin: ISOTime
  }

  type CoursByDateDeleteErr {
    messageErrorCoursByDateDeleteErr: String!
  }
  type CoursByDateUpdateErr {
    messageErrorCoursByDateUpdateErr: String!
  }
  type CoursByDateCreateErr {
    messageErrorCoursByDateCreateErr: String!
  }
  type CoursByDateFindErr {
    messageErrorCoursByDateFindErr: String!
  }
  union CoursByDateResult =
      CoursByDate
    | CoursByDateCreateErr
    | CoursByDateUpdateErr
    | CoursByDateDeleteErr
    | CoursByDateFindErr

  type Query {
    findOneCoursByDate(coursByDateId: String!): CoursByDateResult
  }
  type Mutation {
    createCoursByDate(inputCoursByDate: CoursByDateInput): CoursByDateResult!
    deleteCoursByDate(coursByDateId: String!): Boolean!
    updateCoursByDate(inputCoursByDate: CoursByDateInput, coursByDateId: String): CoursByDateResult!
  }
`
