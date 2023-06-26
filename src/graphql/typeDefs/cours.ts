export default /* GraphQL */ `
  scalar ISODate
  type Cours {
    id: String!
    prof: String
    categorie: String
    excerpt: String
    description: String
    prix: String
    tags: [String]
    link_image: String
    nbEleves: number
    nbSeances: number
    nbEleveListeAttente: number
    idStripe: String
    dateCreation: ISODate
    dateUpdate: ISODate
  }

  input CoursInput {
    prof: String
    categorie: String
    excerpt: String
    description: String
    prix: String
    tags: [String]
    link_image: String
    nbEleves: number
    nbSeances: number
    nbEleveListeAttente: number
    idStripe: String
  }

  type CoursDeleteErr {
    messageErrorCoursDeleteErr: String!
  }
  type CoursUpdateErr {
    messageErrorCoursUpdateErr: String!
  }
  type CoursCreateErr {
    messageErrorCoursCreateErr: String!
  }
  type CoursFindErr {
    messageErrorCoursFindErr: String!
  }
  union CoursResult = Cours | CoursCreateErr | CoursUpdateErr | CoursDeleteErr | CoursFindErr

  type Query {
    findOneCours(coursId: String!): CoursResult!
  }
  type Mutation {
    createCours(inputCours: CoursInput): CoursResult!
    deleteCours(coursId: String!): Boolean!
    updateCours(inputCours: CoursInput): CoursResult!
  }
`
