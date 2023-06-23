export const schemaCours = {
  $jsonSchema: {
    bsonType: "object",
    title: "Cours ou seances",
    additionalProperties: true,
    properties: {
      _id: {
        bsonType: "string",
        description: "Identifiant du cours",
      },
      title: {
        bsonType: "string",
        description: "Identifiant du cours",
      },
      prof: {
        bsonType: "string",
        description: "Nom de la personne qui dispense le cours",
      },
      categorie: {
        bsonType: "string",
        description: "catégorie du cours : Abonnements, Atelier ou Stage",
      },
      excerpt: {
        bsonType: "string",
        description: "extrait cours du descriptif du cours",
      },
      description: {
        bsonType: "string",
        description: "description complète du cours",
      },
      prix: {
        bsonType: "Int",
        description: "Prix en euros du workshop",
      },
      dateCreation: {
        bsonType: "date",
        description: "date de creation du cours",
      },
      dateUpdate: {
        bsonType: "date",
        description: "date de mise à jour du cours",
      },
      tags: {
        bsonType: "array",
        items: {
          bsonType: "string",
          description: "filtres possibles des cours",
        },
      },
      link_image: {
        bsonType: "string",
        description: "lien des images",
      },
      nbEleves: {
        bsonType: "Int",
        description: "Nombre d'élèves autorisés par cours",
      },
      nbSeances: {
        bsonType: "Int",
        description: "Nombre de séances pour le cours",
      },
      nbEleveListeAttente: {
        bsonType: "Int",
        description: "Nombre d'élèves maximum sur la liste d'attente",
      },
      idStripe: {
        bsonType: "string",
        description: "identifiant stripe",
      },
    },
    required: ["_id", "title"],
  },
}

//https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
