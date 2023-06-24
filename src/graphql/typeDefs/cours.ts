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

  type Mutation {
    
  }
`
