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
        bsonType: ["null", "string"],
        description: "nom de l'utilisateur",
      },
      firstname: {
        bsonType: ["null", "string"],
        description: "Prenom de l'utilisateur",
      },
      dateCreation: {
        bsonType: ["null", "date"],
        description: "Date de creation du user",
      },
      dateUpdate: {
        bsonType: ["null", "date"],
        description: "date de mise à jour de ses informations",
      },
      dateLastConnexion: {
        bsonType: ["null", "date"],
        description: "date de dernière connexion - RGPD",
      },
      numTel: {
        bsonType: ["null", "string"],
        description: "Numéro de téléphone de l'utilisateur",
      },
      idStripe: {
        bsonType: ["null", "string"],
        description: "Identifiant de l'utilisateur sur Stripe",
      },
      email: {
        bsonType: "string",
        description: "Adresse email de l'utilisateur",
      },
      coursPaye: {
        bsonType: ["null", "array"],
        items: {
          bsonType: ["null", "object"],
          description: "cours payé par l'utilisateur",
          properties: {
            idCours: {
              bsonType: ["null", "string"],
              description: "identifiant du cours auquel il souhaite participer",
            },
            datePayment: {
              bsonType: ["null", "date"],
              description: "date et heure de paiement du cours",
            },
            selectedDate: {
              bsonType: ["null", "object"],
              description: "",
              properties: {
                idCoursbyDate: {
                  bsonType: ["null", "string"],
                  description: "identifiant du cours dans la tables des cours listé par date",
                },
                status: {
                  bsonType: ["null", "string"],
                  description: "status de participation au cours : inscrit ou annule",
                },
                cancelDate: {
                  bsonType: ["null", "date"],
                  description: "date d'annulation de la seance",
                },
                cancelReason: {
                  bsonType: ["null", "string"],
                  description: "à ne renseigné que lorsqu'une personne annule sa participation",
                },
              },
            },
          },
        },
      },
    },
    required: ["_id", "email"],
  },
}
// la date et heure de paiement permettra de voir quel nombre de séances réduire par rapport au cours pris
//https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
