export const schemaEvents = {
  $jsonSchema: {
    bsonType: "object",
    title: "events",
    additionalProperties: true,
    properties: {
      _id: {
        bsonType: "string",
        description: "Identifiant de l'utilisateur",
      },
      dateCreation: {
        bsonType: "date",
        description: "Date de création de l'évènement",
      },
      type: {
        bsonType: "string",
        description: "Type d'évènement: ponctuel ou récurrent",
      },
      selectedDate: {
        bsonType: "array",
        items: {
          bsonType: "string",
          description:
            "id des séances (date) contenu dans l'évent et pour lesquels il y'a un utilisateurs",
        },
      },
      dateDebut: {
        bsonType: "date",
        description: "Date de début de l'évènement",
      },
      dateUpdate: {
        bsonType: "date",
        description: "Date de début de l'évènement",
      },
      dateFin: {
        bsonType: "date",
        description: "Date de fin de l'évènement",
      },
      data: {
        bsonType: "object",
        properties: {
          description: {
            bsonType: "object",
            properties: {
              eventTitle: { bsonType: "string" },
              categorie: { bsonType: "string" },
              eventLocation: { bsonType: "string" },
            },
          },
          journeePeriode: {
            bsonType: "object",
            properties: {
              allDay: { bsonType: "bool" },
              eventDateDebut: { bsonType: "date" },
              eventHeureDebut: { bsonType: "date" },
              eventDateFin: {
                bsonType: "date",
                description:
                  "date si elle est différente de celle de début, pour les évènements ponctuels",
              },
              eventHeureFin: { bsonType: "date" },
            },
          },
          ecartType: {
            bsonType: "object",
            properties: {
              periodicite: { bsonType: "string" },
            },
          },
          ecartChoix: {
            bsonType: "object",
            properties: {
              periodicite: { bsonType: "string" },
              selectedMonthAnnee: { bsonType: "string" },
              nbPeriode: { bsonType: "string" },
              dayHebdo: {
                bsonType: "object",
                properties: {
                  lun: { bsonType: "bool" },
                  mar: { bsonType: "bool" },
                  mer: { bsonType: "bool" },
                  jeu: { bsonType: "bool" },
                  ven: { bsonType: "bool" },
                  sam: { bsonType: "bool" },
                  dim: { bsonType: "bool" },
                },
              },
              nbMois: { bsonType: "string" },
            },
          },
          infosCompl: {
            bsonType: "object",
            properties: {
              textDescription: { bsonType: "string" },
            },
          },
        },
      },
    },
    required: ["_id"],
  },
}

//https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
