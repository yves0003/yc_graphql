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

type EventType = {
  type: string
  selectedDate: string[]
  dateCreation: Date
  dateDebut: Date
  dateUpdate: Date
  dateFin: Date
  data?: {
    description: {
      eventTitle: string
      categorie: string
      eventLocation: string
    }
    journeePeriode: {
      allDay: boolean
      eventDateDebut: string
      eventHeureDebut: Date
      eventDateFin: string
      eventHeureFin: Date
    }
    ecartType: {
      periodicite: string
    }
    ecartChoix: {
      periodicite: string
      selectedMonthAnnee: string
      nbPeriode: string
      dayHebdo: {
        lun: boolean
        mar: boolean
        mer: boolean
        jeu: boolean
        ven: boolean
        sam: boolean
        dim: boolean
      }
      nbMois: string
    }
    infosCompl: {
      textDescription: string
    }
  }
}
