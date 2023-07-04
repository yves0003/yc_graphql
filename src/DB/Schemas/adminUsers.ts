//pour les utilisateurs normaux et les producteurs
export const schemaAdminUser = {
  $jsonSchema: {
    bsonType: "object",
    title: "users",
    additionalProperties: true,
    properties: {
      userEmail: {
        bsonType: "string",
        description: "email de la personne qui crée le compte",
      },
      userCompleteName: {
        bsonType: "string",
        description: "Nom complet de la personne qui crée le compte",
      },
      userPassword: {
        bsonType: "string",
        description: "mot de passe de la personne qui crée le compte",
      },
      userPassCode: {
        bsonType: "object",
        properties: {
          code: {
            bsonType: "string",
            description: "code envoyé par email",
          },
          sendAt: {
            bsonType: "date",
            description: "date d'envoi du code par email",
          },
          reason: {
            bsonType: "array",
            description: "raison d'envoie du code (inscription, resetcode)",
            items: {
              bsonType: "string",
            },
          },
        },
        description:
          "code envoyé pour vérifier l'adresse email lors de la création et la mise à jour",
      },
      userVerifAccount: {
        bsonType: "bool",
        description: "Status de verification du code l'utilisateur",
      },
      userStatusDelete: {
        bsonType: "bool",
        description: "Status de suppression de l'utilisateur",
      },
      createdAt: {
        bsonType: "date",
        description: "date de création de l'utilisateur",
      },
      dateDelete: {
        bsonType: "date",
        description: "date de suppression de l'utilisateur",
      },
      dateUpdate: {
        bsonType: "date",
        description: "date de mise à jour de l'utilisateur",
      },
      tokenVersion: {
        bsonType: "number",
        description: "version du token qui aide à invalider un user",
      },
      role: {
        bsonType: "array",
        description:
          "liste des roles que avoir le prendre l'utilisateurs (Admin, Artisan, Indep, Entreprise, Etudiant, Public)",
        items: {
          bsonType: "string",
        },
      },
    },
    required: ["_id", "userEmail", "userPassword"],
  },
}
