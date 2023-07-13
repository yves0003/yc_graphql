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
        bsonType: "int",
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
      dateDebut: {
        bsonType: "date",
        description: "date de début du cours",
      },
      dateFin: {
        bsonType: "date",
        description: "date de fin du cours",
      },
      heureDebut: {
        bsonType: "date",
        description: "heure de début du cours",
      },
      heureFin: {
        bsonType: "date",
        description: "heure de fin du cours",
      },
      color: {
        bsonType: "string",
        description: "couleur attribué au cours",
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
        bsonType: "int",
        description: "Nombre d'élèves autorisés par cours",
      },
      nbSeances: {
        bsonType: "int",
        description: "Nombre de séances pour le cours",
      },
      nbEleveListeAttente: {
        bsonType: "int",
        description: "Nombre d'élèves maximum sur la liste d'attente",
      },
      idStripe: {
        bsonType: "string",
        description: "identifiant stripe",
      },
      prerequis: {
        bsonType: "string",
        description: "prerequis de la formation",
      },
      materiels: {
        bsonType: "string",
        description: "matériel pour la formation",
      },
      conseils: {
        bsonType: "string",
        description: "conseils pour la formation",
      },
      allergies: {
        bsonType: "string",
        description: "allergies repas",
      },
      adresse: {
        bsonType: "string",
        description: "adresse du lieu de formation",
      },
    },
    required: ["_id", "title"],
  },
}

//https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
