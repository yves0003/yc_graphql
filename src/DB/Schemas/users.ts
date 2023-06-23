export const schemaUsers = {
  $jsonSchema: {
    bsonType: "object",
    title: "Utilisateurs",
    additionalProperties: true,
    properties: {
      _id: {
        bsonType: "string",
        description: "Identifiant de l'utilisateur",
      },
      name: {
        bsonType: "string",
        description: "nom de l'utilisateur",
      },
      firstname: {
        bsonType: "string",
        description: "Prenom de l'utilisateur",
      },
      dateCreation: {
        bsonType: "date",
        description: "Date de creation du user",
      },
      dateUpdate: {
        bsonType: "date",
        description: "date de mise à jour de ses informations",
      },
      dateLastConnexion: {
        bsonType: "date",
        description: "date de dernière connexion - RGPD",
      },
      numTel: {
        bsonType: "string",
        description: "Numéro de téléphone de l'utilisateur",
      },
      email: {
        bsonType: "string",
        description: "Adresse email de l'utilisateur",
      },
      coursPaye: {
        bsonType: "array",
        items: {
          bsonType: "object",
          description: "cours payé par l'utilisateur",
          properties: {
            idCours: {
              bsonType: "string",
              description: "identifiant du cours auquel il souhaite participer",
            },
            datePayment: {
              bsonType: "date",
              description: "date et heure de paiement du cours",
            },
            selectedDate: {
              bsonType: "object",
              description: "",
              properties: {
                idCoursbyDate: {
                  bsonType: "string",
                  description: "identifiant du cours dans la tables des cours listé par date",
                },
                status: {
                  bsonType: "string",
                  description: "status de participation au cours : inscrit ou annule",
                },
                cancelDate: {
                  bsonType: "date",
                  description: "date d'annulation de la seance",
                },
                cancelReason: {
                  bsonType: "string",
                  description: "à ne renseigné que lorsqu'une personne annule sa participation",
                },
              },
            },
          },
        },
      },
    },
    required: ["_id", "title"],
  },
}
// la date et heure de paiement permettra de voir quel nombre de séances réduire par rapport au cours pris
//https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial