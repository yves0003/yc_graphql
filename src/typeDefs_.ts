
export const typeDefs = `#graphql
  scalar Date
  type description {
    eventTitle: String
    categorie: String
    eventLocation: String
    type: String
  }
  input inputdescription {
    eventTitle: String
    categorie: String
    eventLocation: String
    type: String
  }

  type journeePeriode {
    AllDay: Boolean
    eventDateDebut: Date
    eventHeureDebut: String
    eventDateFin: Date
    eventHeureFin: String
  }
  input inputjourneePeriode {
    AllDay: Boolean
    eventDateDebut: Date
    eventHeureDebut: String
    eventDateFin: Date
    eventHeureFin: String
  }

  type EcartType {
    periodicite: String
  }
  input inputEcartType {
    periodicite: String
  }

  type dayHebdo {
    lun: Boolean
    mar: Boolean
    mer: Boolean
    jeu: Boolean
    ven: Boolean
    sam: Boolean
    dim: Boolean
  }
  input inputdayHebdo {
    lun: Boolean
    mar: Boolean
    mer: Boolean
    jeu: Boolean
    ven: Boolean
    sam: Boolean
    dim: Boolean
  }

  type EcartChoix {
    periodicite: String
    selectedMonthAnnee: String
    nbPeriode: String
    dayHebdo: dayHebdo
    nbMois: String
  }
  input inputEcartChoix {
    periodicite: String
    selectedMonthAnnee: String
    nbPeriode: String
    dayHebdo: inputdayHebdo
    nbMois: String
  }

  type infosCompl {
    textDescription: String
  }
  input inputinfosCompl {
    textDescription: String
  }

  type Cours {
    id: String
    titre: String
    link: String
    categorie: String
    excerpt: String
    description:String
    prix: String
    date_creation: String
    date_maj: String
    # liste des tags
    tags: [String]
    # Lien vers les images
    link_image: String
    # Nombre d'élèves par classe autorisé et maximal
    nb_eleves: Int
    # Nombre maximum de personnes sur la liste d'attente
    nb_list_attente: Int
    # Nombre de séances accessible pour le cours
    nb_seances: Int 
  }

  type data {
    description: description
    journeePeriode: journeePeriode
    EcartType: EcartType
    EcartChoix: EcartChoix
    infosCompl: infosCompl
  }
  input inputdata {
    description: inputdescription
    journeePeriode: inputjourneePeriode
    EcartType: inputEcartType
    EcartChoix: inputEcartChoix
    infosCompl: inputinfosCompl
  }

  type Event {
    _id: String
    creatorId: String
    type: String
    dateDebut: Date
    dateFin: Date
    application: String
    selectedDate: [String]
    data: data
  }
  type EventsNotFound {
    errorEventNotFound: String!
  }
  union EventResult = Event | EventsNotFound

  input inputEvent {
    _id: String
    creatorId: String
    type: String
    dateDebut: Date
    dateFin: Date
    application: String
    data: inputdata
  }

  type SelectedDateByUser {
    # identifiant de la date sélectionnée par rapport à l'évènement récurrent ou ponctuel
    idCoursByDate: String
    # status d'inscription aux cours: inscrit ou annule
    status: String
    # raison pour laquelle l'utilisateur annule la séance
    cancelReason: String
  }

  type coursUtilisateur {
    # Id du cours (table Cours)
    selectedCoursId: String
    # nombre de séances du cours
    nbseances: Number
    # date de paiement du cours
    datePaiement: String
    # Date sélectionnée dans le créneau des évènements rattachés
    selectedDate: [SelectedDateByUser]
  }

  type Utililsateur {
    # adresse email de l'utilisateur
    email: String
    # nom de l'utilisateur
    nom: String
    # prenom de l'utilisateur
    prenom: String
    # cours payés par l'utilisateur
    coursPaye: [coursUtilisateur]
  }

  type Query {
    getEvents: [EventResult]
  }
  type Mutation {
    addEvents(eventInput: inputEvent): EventResult!
  }
`
export default typeDefs
