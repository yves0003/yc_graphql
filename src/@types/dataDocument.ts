type CoursType = {
  _id?: string
  title: string
  prof: string
  categorie: string
  excerpt: string
  description: string
  prix: number
  tags: string[]
  link_image: string
  nbEleves: number
  nbSeances: number
  nbEleveListeAttente: number
  idStripe: string
  dateCreation?: Date
  dateUpdate?: Date
}

type CoursByDateType = {
  _id?: string
  title: string
  dateJ: Date
  idEvent: string
  listInscrit: string[]
  listInteressee: string[]
  status: string
  eventHeureDebut: Date
  eventHeureFin: Date
  dateCreation?: Date
  dateUpdate?: Date
}

type UserType = {
  _id?: string
  name: string
  firstname: string
  numTel: string
  email: string
  dateCreation?: Date
  dateUpdate?: Date
  dateLastConnexion?: Date
  coursPaye: {
    idCours: string
    datePayment: Date
    selectedDate: {
      idCoursbyDate: string
      status: string
      cancelDate: Date
      cancelReason: string
    }
  }[]
}
