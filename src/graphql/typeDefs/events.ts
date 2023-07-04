export default /* GraphQL */ `
  scalar ISODate
  scalar ISOTime

  type descriptionType {
    eventTitle: String
    categorie: String
    eventLocation: String
  }
  type journeePeriodeType {
    allDay: Boolean
    eventDateDebut: ISODate
    eventHeureDebut: ISOTime
    eventDateFin: ISODate
    eventHeureFin: ISOTime
  }
  type ecartTypeType {
    periodicite: String
  }
  type dayHebdoType {
    lun: Boolean
    mar: Boolean
    mer: Boolean
    jeu: Boolean
    ven: Boolean
    sam: Boolean
    dim: Boolean
  }
  type ecartChoixType {
    periodicite: String
    selectedMonthAnnee: String
    nbPeriode: String
    dayHebdo: dayHebdoType
    nbMois: String
  }
  type infosComplType {
    textDescription: String
  }
  type dataType {
    description: descriptionType
    journeePeriode: journeePeriodeType
    ecartType: ecartTypeType
    ecartChoix: ecartChoixType
    infosCompl: infosComplType
  }

  type Event {
    _id: String
    type: String
    selectedDate: [String]
    dateCreation: ISODate
    dateUpdate: ISODate
    dateDebut: ISODate
    dateFin: ISODate
    data: dataType
  }

  input descriptionInput {
    eventTitle: String
    categorie: String
    eventLocation: String
  }
  input journeePeriodeInput {
    allDay: Boolean
    eventDateDebut: ISODate
    eventHeureDebut: ISOTime
    eventDateFin: ISODate
    eventHeureFin: ISOTime
  }
  input ecartTypeInput {
    periodicite: String
  }
  input dayHebdoInput {
    lun: Boolean
    mar: Boolean
    mer: Boolean
    jeu: Boolean
    ven: Boolean
    sam: Boolean
    dim: Boolean
  }
  input ecartChoixInput {
    periodicite: String
    selectedMonthAnnee: String
    nbPeriode: String
    dayHebdo: dayHebdoInput
    nbMois: String
  }
  input infosComplInput {
    textDescription: String
  }
  input dataInput {
    description: descriptionInput
    journeePeriode: journeePeriodeInput
    ecartType: ecartTypeInput
    ecartChoix: ecartChoixInput
    infosCompl: infosComplInput
  }

  input EventInput {
    type: String
    selectedDate: [String]
    dateDebut: ISODate
    dateFin: ISODate
    data: dataInput
  }

  type EventDeleteErr {
    messageErrorEventDeleteErr: String!
  }
  type EventUpdateErr {
    messageErrorEventUpdateErr: String!
  }
  type EventCreateErr {
    messageErrorEventCreateErr: String!
  }
  type EventFindErr {
    messageErrorEventFindErr: String!
  }
  union EventResult = Event | EventCreateErr | EventUpdateErr | EventDeleteErr | EventFindErr

  type Query {
    findOneEvent(userId: String!): UserResult
  }
  type Mutation {
    createEvent(inputEvent: EventInput): EventResult!
    deleteEvent(eventId: String!): Boolean!
    updateEvent(inputEvent: EventInput, eventId: String): EventResult!
  }
`
