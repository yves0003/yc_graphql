export default /* GraphQL */ `
  scalar ISODate
  type Cours {
    _id: String!
    prof: String
    title: String
    categorie: String
    excerpt: String
    description: String
    prix: Int
    tags: [String]
    link_image: String
    nbEleves: Int
    nbSeances: Int
    nbEleveListeAttente: Int
    idStripe: String
    dateCreation: ISODate
    dateUpdate: ISODate
  }

  input CoursInput {
    prof: String
    title: String
    categorie: String
    excerpt: String
    description: String
    prix: Int
    tags: [String]
    link_image: String
    nbEleves: Int
    nbSeances: Int
    nbEleveListeAttente: Int
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
    updateCours(inputCours: CoursInput, coursId:String): CoursResult!
  }
`
