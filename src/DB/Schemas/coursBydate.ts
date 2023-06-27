export const schemaCoursByDate = {
  $jsonSchema: {
    bsonType: "object",
    title: "CoursByDate",
    additionalProperties: true,
    properties: {
      _id: {
        bsonType: "string",
        description: "Identifiant de la séance du jour",
      },
      title: {
        bsonType: "string",
        description: "Titre de l'evenement",
      },
      dateJ: {
        bsonType: "date",
        description:
          "date de l'event, qui peut être modifié avec un impact sur status qui passe à 'reporté'",
      },
      idEvent: {
        bsonType: "string",
        description: "identifiant de l'event associé à ce cours",
      },
      listInscrit: {
        bsonType: "array",
        description:
          "Nombre de personnes inscrites dont le maximum ne doit pas dépasser le nombre d'inscrits + les personnes sur la liste d'attente",
        items: {
          bsonType: "string",
          description: "identifiant des personnes inscrites",
        },
      },
      listInteressee: {
        bsonType: "array",
        items: {
          bsonType: "string",
          description: "identifiant des personnes interessée par le cours",
        },
      },
      dateCreation: {
        bsonType: "date",
        description: "date de creation de la table",
      },
      dateUpdate: {
        bsonType: "date",
        description: "date de mise à jour  de la table",
      },
      status: {
        bsonType: "string",
        description:
          "status du cours : enligne, etre_prev, annulé, reporté, draft (reporter lorsque la date change)",
      },
      eventHeureDebut: {
        bsonType: "date",
        description: "date de début qui doit être égale à celle dans event au début",
      },
      eventHeureFin: {
        bsonType: "date",
        description: "date de fin qui doit être égale à celle dans event au début",
      },
    },
    required: ["_id", "title"],
  },
}
//le status etre_prev permet de n'activer que la liste des personnes intéressées pour les mettre sur la liste d'attente
//listInteressee permet aux personnes de dire qu'elles sont intéressées par le cours
//draft permet de ne pas afficher le cours
//si cours annulé, créer un event ponctuel et proposer aux personnes de s'inscrire pour y assister.
//https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
