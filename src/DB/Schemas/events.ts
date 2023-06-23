export const schemaEvent = {
    $jsonSchema: {
      bsonType: "object",
      title: "events",
      additionalProperties: true,
      properties: {
        _id: {
          bsonType: "string",
          description:"Identifiant de l'utilisateur"
        },
        type: {
          bsonType: "string",
          description: "Type d'évènement: ponctuel ou récurrent"
        },
        selectedDate: {
          bsonType: ["string"],
          description: "liste des id des séances (date) contenu dans l'évent et pour lesquels il y'a un utilisateurs"
        },
        dateDebut: {
          bsonType: "date",
          description: "Date de début de l'évènement"
        },
        dateFin: {
          bsonType: "date",
          description: "Date de fin de l'évènement"
        },
        data: {
          bsonType: "object",
          properties: {
            description: {
              bsonType: "object",
              properties: {
                eventTitle: {bsonType: "string",},
                categorie: {bsonType: "string",},
                eventLocation: {bsonType: "string",}
              }
            },
            journeePeriode: {
              bsonType: "object",
              properties: {
                allDay: {bsonType: "boolean",},
                eventDateDebut: {bsonType: "string",},
                eventHeureDebut:{bsonType: "string",},
                eventDateFin: {bsonType: "string", description:"date si elle est différente de celle de début, pour les évènements ponctuels"},
                eventHeureFin: {bsonType: "string",}
              }
            },
            ecartType: {
              bsonType: "object",
              properties: {
                periodicite:{bsonType: "string",}
              }
            },
            ecartChoix: {
              bsonType: "object",
              properties: {
                periodicite: {bsonType: "string",},
                selectedMonthAnnee: {bsonType: "string",},
                nbPeriode: {bsonType: "string",},
                dayHebdo: {
                  bsonType: "object",
                  properties : {
                    lun:  {bsonType: "boolean",},
                    mar:  {bsonType: "boolean",},
                    mer:  {bsonType: "boolean",},
                    jeu:  {bsonType: "boolean",},
                    ven:  {bsonType: "boolean",},
                    sam:  {bsonType: "boolean",},
                    dim:  {bsonType: "boolean",}
                  }
                },
                nbMois: {bsonType: "string",}
              }
            },
            infosCompl: {
              bsonType: "object",
              properties : {
                textDescription: {bsonType: "string",}
              }
            }
          }
        },
      },
      required: ["_id", "type"],
    },
  }

  //https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial