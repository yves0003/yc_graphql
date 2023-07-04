import { GraphQLDateTime } from "graphql-scalars"
import { adminUsers } from "../../DB/Tables.js"
import { Db } from "mongodb"
import { validateConnexionInput, validateInscriptionInput } from "../../helpers/validators.js"
import { hashEncodePassword, hashVerifPassword } from "../../helpers/hash_password.js"
import { signAccessToken, signRefreshToken } from "../../helpers/jwt_helper.js"
import { checkAuth } from "../../helpers/check-auth.js"
import { tokenVersion } from "../../Config/tokenVersion.js"

const deleteUser = async (
  _parents,
  { input: { _id } }: { input: { _id: string } },
  { db }: { db: Db }
) => {
  try {
    if (_id) {
      const data = await adminUsers.deleteOne(db, _id)
      return data.deletedCount >= 1 ? true : false
    } else {
      return false
    }
  } catch (error) {
    return error
  }
}

const connexion = async (_parents, { input: { userEmail, userPassword } }, _context) => {
  // valider les inputs
  const { valid, errors } = validateConnexionInput(userEmail, userPassword)
  if (!valid) {
    return {
      messageErrorInfoIncorrect: errors.userEmail || errors.userPassword,
    }
  }
  // Récupérer les infos de l'utilisateur
  const user = await adminUsers.findOne(_context.db, { userEmail })

  //Controle sur les données utilisateurs
  if (!user) {
    return {
      messageErrorNotFound: `l'utilisateur avec ${userEmail} n'existe pas`,
    }
  }
  if (user && !user.userVerifAccount) {
    return {
      messageErrorUserNotVerified: "verify code",
    }
  }
  if (user && user.userStatusDelete) {
    return {
      messageErrorDel: `l'utilisateur avec ${userEmail} a été supprimé`,
    }
  }
  // verification des mots de passe
  const match = await hashVerifPassword(userPassword, user.userPassword!)
  if (!match) {
    return {
      messageErrorWrongID: "Mauvais identifiants",
    }
  }
  // creation des tokens
  const accessToken = await signAccessToken({
    UserInfo: { _id: user._id!, roles: user.roles! },
  })
  const refreshToken = await signRefreshToken({
    _id: user._id!,
    tokenVersion: user.tokenVersion,
  })
  // Sauvegarde dans cookies
  try {
    _context.res.cookie("jid", refreshToken, {
      httpOnly: true,
    })
  } catch (error) {
    return {
      messageErrorErrAccessCookies: "impossible de d'accéder au cookies",
    }
  }
  return {
    ...user,
    accessToken,
    refreshToken,
  }
}

const inscription = async (
  _parents,
  { input: { userEmail, userPassword, userPreferLang, userCompleteName, userPassCode, roles } },
  _context
) => {
  try {
    const { valid, errors } = validateInscriptionInput(userEmail, userPassword)
    if (!valid) {
      return {
        messageErrorInfoIncorrect: errors.userEmail || errors.userEmail,
      }
    }
    // Makes sure users email doesnt already exist
    const user = await adminUsers.findOne(_context.db, {
      userEmail,
    })
    if (user && user.userVerifAccount) {
      return {
        messageErrorEmailUsed: `l'adresse mail ${userEmail} appartient à un autre utilisateur`,
      }
    }
    if (
      user &&
      !user.userVerifAccount &&
      user.userPassCode?.reason.length === 1 &&
      user.userPassCode?.reason.includes("Inscription")
    ) {
      return {
        messageErrorUserNotVerified: "verify code Insc",
      }
    }
    if (
      user &&
      !user.userVerifAccount &&
      user.userPassCode?.reason.length === 2 &&
      user.userPassCode?.reason.includes("resetcode")
    ) {
      return {
        messageErrorUserNotVerified: "verify code Reset",
      }
    }
    // si l'utilisateur n'existe pas, alors je le crée
    // hash le password et creation des tokens
    userPassword = await hashEncodePassword(userPassword)

    const newUser = await adminUsers.add(_context.db, {
      userEmail,
      userPassword,
      userPreferLang,
      userCompleteName,
      userPassCode,
      tokenVersion: tokenVersion,
    })
    return newUser
    // valider les inputs
  } catch (error) {
    console.log(error)
  }
}

const verifCode = async (_parents, { input: { userEmail, userPassCode } }, _context) => {
  const user = await adminUsers.findOne(_context.db, {
    userEmail,
  })

  if (!user) {
    return {
      messageErrorNotFound: `l'utilisateur avec ${userEmail} n'existe pas`,
    }
  }

  if (user && user.userVerifAccount) {
    return {
      messageErrorUserAlreadyVerified: `l'utilisateur vérifié`,
    }
  }

  if (userPassCode.code !== user.userPassCode?.code) {
    return {
      messageErrorCodeIncorrect: "le code ne correspond",
    }
  }

  // Mise à jour du status authentification
  const updatedUser = await adminUsers.updateOne(_context.db, user._id!, {
    userVerifAccount: true,
  })
  // creation des tokens
  const accessToken = await signAccessToken({
    UserInfo: { _id: user._id!, roles: user.roles! },
  })
  const refreshToken = await signRefreshToken({
    _id: user._id!,
    tokenVersion: user.tokenVersion,
  })

  // Sauvegarde dans cookies
  try {
    _context.res.cookie("jid", refreshToken, {
      httpOnly: true,
    })
  } catch (error) {
    return {
      messageErrorErrAccessCookies: "impossible de d'accéder au cookies",
    }
  }

  return { ...updatedUser, accessToken, refreshToken }
}

const logoutUser = async (_parents, _args, _context) => {
  try {
    _context.res.clearCookie("jid")
  } catch (error) {
    return false
  }
  return true
}
const updateOneUser = async (_parents, { input: { _id, userEmail, ...valToUpdate } }, _context) => {
  try {
    const data = await adminUsers.updateOne(_context.db, _id ? _id : userEmail, valToUpdate)
    return data
  } catch (error) {
    return error
  }
}

const findOneUser = async (_parents, { input }, _context) => {
  try {
    await checkAuth(_context)
    const data = await adminUsers.findOne(_context.db, {
      _id: input._id,
    })
    return data
  } catch (error) {
    return {
      messageErrorNotFound: `PB findOneUser ${input.userEmail}:${error}`,
    }
  }
}

const updatePassword = async (
  //.............Ne pas oublier de faire verif code avant
  _parents,
  { input: { userEmail, userPassCode, userPassword } },
  _context
) => {
  const userToFind = await adminUsers.findOne(_context.db, {
    userEmail,
  })
  if (!userToFind) {
    return {
      messageErrorUpdateUser: "l'utilisateur n'existe pas",
    }
  }
  if (userPassCode !== userToFind.userPassCode) {
    return {
      messageErrorCodeIncorrect: "le code ne correspond",
    }
  }
  const userToUpdate = await adminUsers.updateOne(_context.db, userToFind._id!, {
    userPassword,
  })
  // creation des tokens
  const accessToken = await signAccessToken({
    UserInfo: { _id: userToUpdate!._id, roles: userToUpdate!.roles! },
  })
  const refreshToken = await signRefreshToken({
    _id: userToUpdate!._id,
    tokenVersion: userToUpdate!.tokenVersion,
  })
  // Sauvegarde dans cookies
  try {
    _context.res.cookie("jid", refreshToken, {
      httpOnly: true,
    })
  } catch (error) {
    return {
      messageErrorUpdateCookie: "Sauvegarde des données impossible",
    }
  }
  return { ...userToUpdate, accessToken, refreshToken }
}

const userAdminResolver = {
  UserResult: {
    __resolveType(obj: any) {
      //connexion
      if (obj.messageErrorInfoIncorrect) return "UserInfoIncorrect"
      if (obj.messageErrorNotFound) return "UserIntrouvable"
      if (obj.messageErrorDel) return "UserSupprime"
      if (obj.messageErrorWrongID) return "UserWrongID"
      if (obj.messageErrorErrAccessCookies) return "UserAccessCookieDenied"
      //inscription
      if (obj.messageErrorEmailUsed) return "UserEmailUtilise"
      if (obj.messageErrorUserNotVerified) return "UserNotVerified"
      //verifCode
      if (obj.messageErrorUserAlreadyVerified) return "UserVerified"
      if (obj.messageErrorCodeIncorrect) return "UserCodeIncorrect"
      //updateUser
      if (obj.messageErrorUpdateCookie) return "UserUpdateCookie"
      return "User"
    },
  },
  Query: {
    findOneUser,
    connexion,
  },
  Mutation: {
    deleteUser,
    updatePassword,
    verifCode,
    inscription,
    logoutUser,
    updateOneUser,
  },
  DateTime: GraphQLDateTime,
}

export default userAdminResolver
