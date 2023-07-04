import { verifEmail } from "./verif_email.js";

interface Error {
  userEmail?: string;
  userPassword?: string;
}

export const validateInscriptionInput = (
  userEmail: string,
  userPassword: string
) => {
  const errors: Error = {};
  if (userEmail.trim() === "") {
    errors.userEmail = "l'adresse e-mail doit être renseignée";
  } else {
    const isEmail = verifEmail(userEmail);
    if (!isEmail) {
      errors.userEmail = "Veuillez rentrer une adresse e-mail valide";
    }
  }
  if (userPassword.trim() === "") {
    errors.userPassword = "Veuillez renseigner votre mot de passe";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

export const validateConnexionInput = (
  userEmail: string,
  userPassword: string
) => {
  const errors: Error = {};
  if (userEmail.trim() === "") {
    errors.userEmail = "l'adresse e-mail doit être renseignée";
  } else {
    const isEmail = verifEmail(userEmail);
    if (!isEmail) {
      errors.userEmail = "Veuillez rentrer une adresse e-mail valide";
    }
  }
  if (userPassword.trim() === "") {
    errors.userPassword = "le mot de passe doit être renseigné";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
