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
  prerequis: string
  materiels: string
  conseils: string
  allergies: string
  adresse: string
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

type UserAdminType = {
  _id: string
  userEmail: string
  userCompleteName: string
  userPassword: string
  userPassCode: {
    code: string
    sendAt: Date
    reason: ("Inscription" | "resetcode")[]
  }
  userPreferLang: string
  userVerifAccount: Boolean
  userStatusDelete: Boolean
  userDateDelete: Date
  createdAt: Date
  dateUpdate: Date
  dateDelete: Date
  tokenVersion: number
  roles: ("Admin" | "Artisan" | "Indep" | "Influenceur" | "Entreprise" | "Etudiant" | "Public")[]
}
type Request = import("express").Request
interface RequestExtended extends Request {
  user: string
  roles: ("Admin" | "Artisan" | "Indep" | "Influenceur" | "Entreprise" | "Etudiant" | "Public")[]
  db: import("mongodb").Db
  cookies: { auth?: string }
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
